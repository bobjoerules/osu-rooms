import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  writeBatch
} from "firebase/firestore";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth, db } from "../firebaseConfig";
import { useBuildings } from "../lib/DatabaseContext";
import { useHapticFeedback, useSettings } from "../lib/SettingsContext";
import { Theme, useTheme } from "../theme";

const colours = { white: '#ffffff' };

export default function Account() {
  const theme = useTheme();
  const { showPlaceholders, setShowPlaceholders, useHaptics, setUseHaptics, showBuildingImages, setShowBuildingImages, useBetaFeatures, setUseBetaFeatures, showSubmitTab, setShowSubmitTab } = useSettings();
  const triggerHaptic = useHapticFeedback();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [showAppStore, setShowAppStore] = useState(false);
  const [showPlayStore, setShowPlayStore] = useState(false);

  const centerLoginMobile = Platform.OS !== 'web' && !userEmail;

  const { buildings } = useBuildings();

  const totalRooms = useMemo(() => {
    return buildings.reduce((acc, building) => acc + (building.rooms?.length || 0), 0);
  }, [buildings]);

  const version = Constants.expoConfig?.version || "1.0.0";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUserEmail(user?.email ?? null);
      setUserName(user?.displayName ?? null);

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.username) {
              setUserName(userData.username);
            }

            const role = userData.role;
            setUserRole(role);

            if (role === "admin" || role === "owner") {
              setIsAdmin(true);

              const submissionsColl = collection(db, "submissions");
              const q = query(submissionsColl, where("status", "==", "pending"));
              onSnapshot(q, (snapshot) => {
                setPendingCount(snapshot.size);
              });
            } else {
              setIsAdmin(false);
              setPendingCount(null);
            }
          } else {
            setIsAdmin(false);
            setUserRole(null);
            setPendingCount(null);
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
          setUserRole(null);
          setPendingCount(null);
        }

        try {
          const coll = collection(db, "users");
          const snapshot = await getCountFromServer(coll);
          setUserCount(snapshot.data().count);
        } catch (err) {
          console.error("Error fetching user count:", err);
        }
      } else {
        setIsAdmin(false);
        setUserRole(null);
        setUserCount(null);
        setPendingCount(null);
      }
    });
    return unsub;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        currentUser.reload().then(async () => {
          setUserEmail(currentUser.email);
          setUserName(currentUser.displayName);
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const role = userData.role;
              setUserRole(role);

              if (role === "admin" || role === "owner") {
                setIsAdmin(true);
                const submissionsColl = collection(db, "submissions");
                const q = query(submissionsColl, where("status", "==", "pending"));
                const snapshot = await getCountFromServer(q);
                setPendingCount(snapshot.data().count);
              } else {
                setIsAdmin(false);
                setPendingCount(null);
              }
            }
          } catch (err) {
            console.error("Error reloading admin status:", err);
          }
          try {
            const coll = collection(db, "users");
            const snapshot = await getCountFromServer(coll);
            setUserCount(snapshot.data().count);
          } catch (err) {
            console.error("Error fetching user count:", err);
          }
        }).catch((error) => {
          console.error("Error reloading user:", error);
        });
      }
    }, [])
  );

  async function handleSubmit() {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedUsername = username.trim();

    setMessage(null);
    setEmailError(null);
    setPasswordError(null);
    setUsernameError(null);

    let hasError = false;
    if (!trimmedEmail) {
      setEmailError('Email is required.');
      hasError = true;
    }
    if (!trimmedPassword) {
      setPasswordError('Password is required.');
      hasError = true;
    }
    if (isSignup && !trimmedUsername) {
      setUsernameError('Username is required.');
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    triggerHaptic();
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
        setMessage("Signed in!");
      } else {
        const trimmedName = trimmedUsername;
        const lowerName = trimmedName.toLowerCase();

        const nameRef = doc(db, "usernames", lowerName);
        const nameSnap = await getDoc(nameRef);

        if (nameSnap.exists()) {
          setUsernameError("Username is already taken.");
          setLoading(false);
          return;
        }

        const result = await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPassword
        );

        await updateProfile(result.user, { displayName: trimmedName });

        const batch = writeBatch(db);
        batch.set(nameRef, { uid: result.user.uid });
        batch.set(doc(db, "users", result.user.uid), {
          username: trimmedName,
          role: "user",
          email: trimmedEmail,
        });
        await batch.commit();

        try {
          await sendEmailVerification(result.user);
          setMessage("Account created! Please check your email to verify.");
        } catch (verifyErr: any) {
          console.error("Verification email failed", verifyErr);
          Alert.alert("Verification Error", "Failed to send verification email: " + verifyErr.message);
          setMessage("Account created, but failed to send verification email. Please use the Resend button.");
        }
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      const friendly =
        err instanceof Error ? err.message : "Something went wrong.";
      const context = mode === "login" ? "Sign in" : "Sign up";

      if (code === "auth/invalid-email" || code === "auth/missing-email") {
        setEmailError("Check your email address.");
      } else if (
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential" ||
        code === "auth/missing-password"
      ) {
        setPasswordError("Check your password.");
      } else if (code === "auth/weak-password") {
        setPasswordError("Password is too weak (min 6 characters).");
      } else {
        setMessage(`${context} failed${code ? ` (${code})` : ""}: ${friendly} `);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    triggerHaptic();
    const confirmDelete = () => {
      return new Promise((resolve) => {
        if (Platform.OS === 'web') {
          resolve(window.confirm("Are you sure you want to delete your account? This action cannot be undone."));
        } else {
          Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
              { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
              { text: "Delete", style: "destructive", onPress: () => resolve(true) }
            ]
          );
        }
      });
    };

    if (!await confirmDelete()) return;

    setLoading(true);
    console.log("Starting account deletion process...");
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No current user found during delete.");
        return;
      }

      const uid = user.uid;
      console.log("Deleting data for uid:", uid);

      if (userName) {
        try {
          await deleteDoc(doc(db, "usernames", userName.toLowerCase()));
          console.log("Username map deleted");
        } catch (e) {
          console.error("Failed to delete username map:", e);
        }
      }
      try {
        await deleteDoc(doc(db, "users", uid));
        console.log("User doc deleted");
      } catch (e) {
        console.error("Failed to delete user doc:", e);
      }

      try {
        console.log("Querying user ratings to delete...");

        const userIdQuery = query(collectionGroup(db, 'userRatings'), where('userId', '==', uid));
        const [userIdSnap, userEmailSnap] = await Promise.all([
          getDocs(userIdQuery),
          userEmail ? getDocs(query(collectionGroup(db, 'userRatings'), where('userEmail', '==', userEmail))) : Promise.resolve({ docs: [] } as any)
        ]);

        const allDocs = [...userIdSnap.docs];
        userEmailSnap.forEach((d: any) => {
          if (!allDocs.find(ad => ad.id === d.id && ad.ref.path === d.ref.path)) {
            allDocs.push(d);
          }
        });

        console.log(`Found ${allDocs.length} ratings/comments to delete.`);

        const batch = writeBatch(db);
        allDocs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        console.log("All user comments and detailed ratings deleted.");
      } catch (e) {
        console.error("Failed to delete user ratings/comments:", e);
      }

      console.log("Deleting auth user...");
      await deleteUser(user);
      console.log("Auth user deleted");

      setMessage("Account deleted.");
      if (Platform.OS === 'web') {
        window.alert("Account successfully deleted.");
        router.replace('/');
      } else {
        Alert.alert("Success", "Account deleted.");
      }
    } catch (error: any) {
      console.error("Delete account error:", error);
      if (error.code === 'auth/requires-recent-login') {
        const msg = "For security, please sign out and sign back in to delete your account.";
        if (Platform.OS === 'web') {
          window.alert(msg);
        } else {
          Alert.alert("Security Check", msg);
        }
      } else {
        const msg = "Failed to delete account: " + (error.message || error.code);
        if (Platform.OS === 'web') {
          window.alert(msg);
        } else {
          Alert.alert("Error", msg);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    triggerHaptic();
    setMessage(null);
    try {
      await signOut(auth);
      if (Platform.OS === 'web') {
        router.replace('/');
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      const friendly =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessage(`Sign out failed${code ? ` (${code})` : ""}: ${friendly} `);
    }
  }

  const isSignup = mode === "signup";
  const isDisabled = isSignup
    ? !email.trim() || !password.trim() || !username.trim()
    : !email.trim() || !password.trim();

  const APP_STORE_URL = 'https://apps.apple.com/app/idXXXXXXXXX';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=XXXXXXXX';

  const renderHeader = (isSticky: boolean) => (
    <View style={[
      styles.header,
      isSticky && { maxWidth: isDesktopWeb ? 1200 : '100%', paddingHorizontal: 20, alignSelf: 'center' },
      !isSticky && { marginBottom: 12, alignSelf: 'center' },
      Platform.OS === 'web' && { paddingTop: 75 + 16 }
    ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={styles.headerTitle}>
          {userEmail ? "Account" : isSignup ? "Sign up" : "Sign in"}
        </Text>
        {isAdmin && (
          <View style={[styles.adminBadge, userRole === 'owner' && { backgroundColor: '#FFD70022', borderColor: '#FFD70044' }]}>
            <Text style={[styles.adminBadgeText, userRole === 'owner' && { color: '#B8860B' }]}>
              {userRole === 'owner' ? 'OWNER' : 'ADMIN'}
            </Text>
          </View>
        )}
        {userRole === 'test' && (
          <View style={styles.testBadge}>
            <Text style={styles.testBadgeText}>TEST</Text>
          </View>
        )}
        {userEmail && auth.currentUser?.emailVerified && userEmail.toLowerCase().endsWith('@oregonstate.edu') && (
          <View style={styles.osuBadge}>
            <Text style={styles.osuBadgeText}>OSU</Text>
          </View>
        )}
      </View>
      <Text style={styles.headerSubtitle}>
        {userEmail
          ? "Manage your account and preferences"
          : isSignup
            ? "Create an account to continue"
            : "Welcome back"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {userEmail && renderHeader(true)}
      <ScrollView
        style={[{ flex: 1, width: '100%' }, (isDesktopWeb && userEmail) && { width: '100%', maxWidth: 1200, alignSelf: 'center' }]}
        contentContainerStyle={[
          styles.scrollContent,
          (isDesktopWeb || centerLoginMobile) && styles.scrollContentCentered,
          {
            paddingBottom: Math.max(insets.bottom, 20) + (Platform.OS === 'android' ? 80 : 60)
          }
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        {!userEmail && renderHeader(false)}
        <View style={styles.card}>
          {userEmail ? (
            <View style={styles.section}>
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.label}>Username</Text>
                  <Text style={styles.value}>{userName || "User"}</Text>
                </View>
                <Ionicons name="person-circle-outline" size={24} color={theme.subtext} />
              </View>
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{userEmail}</Text>
                </View>
                <Ionicons name="mail-outline" size={24} color={theme.subtext} />
              </View>

              {auth.currentUser && !auth.currentUser.emailVerified && (
                <View style={{ marginTop: 8 }}>
                  <Text style={[styles.errorText, { marginBottom: 8 }]}>Email not verified</Text>
                  <Pressable
                    style={[styles.buttonSecondary, { backgroundColor: theme.primary, borderColor: theme.primary, marginTop: 20, width: '100%' }]}
                    onPress={async () => {
                      triggerHaptic();
                      try {
                        if (auth.currentUser) {
                          await sendEmailVerification(auth.currentUser);
                          Alert.alert('Sent', 'Verification email sent!');
                        }
                      } catch (e) {
                        Alert.alert('Error', 'Failed to send verification email.');
                      }
                    }}
                  >
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Resend Verification Email</Text>
                  </Pressable>
                </View>
              )}

              <Pressable style={[styles.buttonSecondary, { marginTop: 20, width: '100%' }]} onPress={handleSignOut}>
                <Text style={[styles.buttonText, { color: theme.text }]}>Sign out</Text>
              </Pressable>

              {!isAdmin && (
                <Pressable
                  style={[styles.buttonSecondary, { marginTop: 12, width: '100%', borderColor: theme.destructive + '44', backgroundColor: theme.destructive + '11' }]}
                  onPress={handleDeleteAccount}
                >
                  <Text style={[styles.buttonText, { color: theme.destructive }]}>Delete Account</Text>
                </Pressable>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: 12 }}>
                <Pressable
                  onPress={() => router.push('/privacy' as any)}
                >
                  <Text style={{ color: theme.subtext, fontSize: 13, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                </Pressable>

                <Text style={{ color: theme.subtext, fontSize: 13 }}>•</Text>

                <Pressable
                  onPress={() => router.push('/delete-account' as any)}
                >
                  <Text style={{ color: theme.subtext, fontSize: 13, textDecorationLine: 'underline' }}>Account Deletion Info</Text>
                </Pressable>
              </View>

              {isAdmin && (
                <View style={styles.adminContainer}>
                  <View style={styles.separator} />
                  <Text style={styles.adminTitle}>Admin Tools</Text>
                  <Pressable
                    style={({ pressed }) => [
                      styles.adminCard,
                      { backgroundColor: pressed ? theme.border + '44' : theme.background + '88' }
                    ]}
                    onPress={() => {
                      triggerHaptic();
                      router.push("/admin" as any);
                    }}
                  >
                    <View style={styles.adminCardContent}>
                      <View style={styles.adminIconContainer}>
                        <Ionicons name="documents-outline" size={22} color="#34C759" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.adminCardTitle, { color: theme.text }]}>Review Submissions</Text>
                        <Text style={[styles.adminCardSubtitle, { color: theme.subtext }]}>
                          {pendingCount !== null ? `${pendingCount} pending reviews` : 'Manage room updates'}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
                    </View>
                  </Pressable>

                </View>
              )}

              <View style={styles.settingsContainer}>
                <View style={styles.separator} />
                <Text style={styles.settingsTitle}>Settings</Text>
                <View style={styles.settingRow}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>Show rooms without photos</Text>
                    <Text style={[styles.settingDescription, { color: theme.subtext }]}>Display rooms that currently have placeholder images (these rooms have a higher chance of being inaccurate)</Text>
                  </View>
                  <Switch
                    value={showPlaceholders}
                    onValueChange={(val) => {
                      triggerHaptic();
                      setShowPlaceholders(val);
                    }}
                    trackColor={{ false: theme.border, true: theme.primary }}
                    thumbColor={Platform.OS === 'ios' ? undefined : colours.white}
                    activeThumbColor={colours.white}
                  />
                </View>

                {Platform.OS !== 'web' && (
                  <View style={styles.settingRow}>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text style={[styles.settingLabel, { color: theme.text }]}>Haptic Feedback</Text>
                      <Text style={[styles.settingDescription, { color: theme.subtext }]}>Vibrate on every click and interaction</Text>
                    </View>
                    <Switch
                      value={useHaptics}
                      onValueChange={(val) => {
                        triggerHaptic();
                        setUseHaptics(val);
                      }}
                      trackColor={{ false: theme.border, true: theme.primary }}
                      thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
                      activeThumbColor="white"
                    />
                  </View>
                )}

                <View style={styles.settingRow}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>Show Building Images</Text>
                    <Text style={[styles.settingDescription, { color: theme.subtext }]}>Display building images under dropdown headers</Text>
                  </View>
                  <Switch
                    value={showBuildingImages}
                    onValueChange={(val) => {
                      triggerHaptic();
                      setShowBuildingImages(val);
                    }}
                    trackColor={{ false: theme.border, true: theme.primary }}
                    thumbColor={Platform.OS === 'ios' ? undefined : colours.white}
                    activeThumbColor={colours.white}
                  />
                </View>

                <View style={styles.settingRow}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>OSU Tab</Text>
                    <Text style={[styles.settingDescription, { color: theme.subtext }]}>Adds a tab with useful student links</Text>
                  </View>
                  <Switch
                    value={useBetaFeatures}
                    onValueChange={(val) => {
                      triggerHaptic();
                      setUseBetaFeatures(val);
                    }}
                    trackColor={{ false: theme.border, true: theme.primary }}
                    thumbColor={Platform.OS === 'ios' ? undefined : colours.white}
                    activeThumbColor={colours.white}
                  />
                </View>

                <View style={styles.settingRow}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[styles.settingLabel, { color: theme.text }]}>Add/Edit Tab</Text>
                    <Text style={[styles.settingDescription, { color: theme.subtext }]}>Display the add/edit room tab in the menu bar</Text>
                  </View>
                  <Switch
                    value={showSubmitTab}
                    onValueChange={(val) => {
                      triggerHaptic();
                      setShowSubmitTab(val);
                    }}
                    trackColor={{ false: theme.border, true: theme.primary }}
                    thumbColor={Platform.OS === 'ios' ? undefined : colours.white}
                    activeThumbColor={colours.white}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.section}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor={theme.placeholder}
                style={[styles.input, emailError && styles.inputError]}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={handleSubmit}
                returnKeyType="next"
              />
              {emailError && <Text style={styles.errorText}>{emailError}</Text>}
              <TextInput
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={theme.placeholder}
                style={[styles.input, passwordError && styles.inputError]}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleSubmit}
                returnKeyType={isSignup ? "next" : "go"}
              />
              {passwordError && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}
              {isSignup && (
                <>
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor={theme.placeholder}
                    style={[styles.input, usernameError && styles.inputError]}
                    value={username}
                    onChangeText={setUsername}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="go"
                  />
                  {usernameError && (
                    <Text style={styles.errorText}>{usernameError}</Text>
                  )}
                </>
              )}

              <Pressable
                style={[styles.button, isDisabled && styles.buttonDisabled]}
                onPress={isDisabled ? undefined : handleSubmit}
                disabled={isDisabled}
              >
                {loading ? (
                  <ActivityIndicator color={theme.buttonText} />
                ) : (
                  <Text style={styles.buttonText}>
                    {isSignup ? "Create account" : "Sign in"}
                  </Text>
                )}
              </Pressable>

              <Pressable
                style={styles.linkButton}
                onPress={() => {
                  triggerHaptic();
                  setMode(isSignup ? "login" : "signup");
                  setMessage(null);
                  setEmailError(null);
                  setPasswordError(null);
                  setUsernameError(null);
                }}
              >
                <Text style={styles.linkText}>
                  {isSignup
                    ? "Have an account? Sign in"
                    : "Need an account? Sign up"}
                </Text>
              </Pressable>

              {Platform.OS === 'web' && !userEmail && (showAppStore || showPlayStore) && (
                <View style={styles.storeLinks}>
                  <Text style={[styles.storeHeader, { color: theme.subtext }]}>Get the app</Text>
                  <View style={styles.storeRow}>
                    {showAppStore && (
                      <Pressable
                        style={[styles.storeBtn, { backgroundColor: '#000' }]}
                        onPress={() => Linking.openURL(APP_STORE_URL)}
                      >
                        <Ionicons name="logo-apple" size={18} color="#fff" />
                        <Text style={styles.storeBtnText}>Download on the App Store</Text>
                      </Pressable>
                    )}
                    {showPlayStore && (
                      <Pressable
                        style={[styles.storeBtn, { backgroundColor: '#188038' }]}
                        onPress={() => Linking.openURL(PLAY_STORE_URL)}
                      >
                        <Ionicons name="logo-google" size={18} color="#fff" />
                        <Text style={styles.storeBtnText}>Get it on Google Play</Text>
                      </Pressable>
                    )}
                  </View>
                  <Text style={[styles.storeHeader, { color: theme.subtext }]}>Or scan a QR code</Text>
                  <View style={styles.qrRow}>
                    {showAppStore && (
                      <Pressable onPress={() => Linking.openURL(APP_STORE_URL)} style={styles.qrItem}>
                        <Image
                          source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(APP_STORE_URL)}` }}
                          style={styles.qrCode}
                        />
                        <Text style={[styles.qrCaption, { color: theme.subtext }]}>App Store</Text>
                      </Pressable>
                    )}
                    {showPlayStore && (
                      <Pressable onPress={() => Linking.openURL(PLAY_STORE_URL)} style={styles.qrItem}>
                        <Image
                          source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(PLAY_STORE_URL)}` }}
                          style={styles.qrCode}
                        />
                        <Text style={[styles.qrCaption, { color: theme.subtext }]}>Google Play</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              )}
            </View>
          )}

          {message && <Text style={styles.message}>{message}</Text>}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {userCount !== null ? `Users: ${userCount} • ` : ""}Rooms: {totalRooms} • Version {version}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 0,
      paddingBottom: 40,
    },
    scrollContentCentered: {
      justifyContent: "center",
      paddingTop: 0,
    },
    containerCentered: {
      justifyContent: "center",
    },
    header: {
      paddingVertical: 16,
      width: "100%",
      maxWidth: 400,
    },
    headerTitle: {
      color: theme.text,
      fontSize: 28,
      fontWeight: 'bold',
    },
    headerSubtitle: {
      color: theme.subtext,
      fontSize: 14,
      marginTop: 4,
    },
    card: {
      backgroundColor: theme.card,
      width: "100%",
      maxWidth: 400,
      borderRadius: 16,
      padding: 20,
      gap: 16,
      shadowColor: "#000",
      shadowOpacity: theme.shadowOpacity,
      shadowRadius: theme.shadowRadius,
      shadowOffset: { width: 0, height: 8 },
    },
    section: {
      gap: 10,
    },
    label: {
      color: theme.subtext,
      fontSize: 14,
    },
    value: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "600",
    },
    input: {
      backgroundColor: theme.inputBg,
      color: theme.inputText,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    inputError: {
      borderColor: theme.destructive,
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    buttonDisabled: {
      backgroundColor: theme.subtext,
      opacity: 0.5,
    },
    buttonSecondary: {
      backgroundColor: theme.inputBg,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: "700",
    },
    linkButton: {
      alignItems: "center",
      paddingVertical: 4,
    },
    linkText: {
      color: theme.link,
      fontSize: 14,
      fontWeight: "600",
    },
    message: {
      color: theme.message,
      textAlign: "center",
      fontSize: 14,
    },
    footer: {
      marginTop: 20,
      alignItems: "center",
      gap: 4,
    },
    footerText: {
      color: theme.subtext,
      fontSize: 12,
      opacity: 0.7,
    },
    errorText: {
      color: theme.destructive,
      fontSize: 13,
      marginTop: -4,
      marginBottom: 4,
    },
    adminBadge: {
      backgroundColor: theme.primary + '22',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.primary + '44',
    },
    adminBadgeText: {
      color: theme.primary,
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    osuBadge: {
      backgroundColor: '#DC4405' + '22',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#DC4405' + '44',
    },
    osuBadgeText: {
      color: '#DC4405',
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    testBadge: {
      backgroundColor: '#9333EA' + '22',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#9333EA' + '44',
    },
    testBadgeText: {
      color: '#9333EA',
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    adminContainer: {
      marginTop: 8,
      gap: 12,
    },
    adminTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.subtext,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    adminCard: {
      borderRadius: 12,
      borderColor: theme.border,
      overflow: 'hidden',
    },
    adminCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      gap: 12,
    },
    adminIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: '#34C75922',
      alignItems: 'center',
      justifyContent: 'center',
    },
    adminCardTitle: {
      fontSize: 15,
      fontWeight: '600',
    },
    adminCardSubtitle: {
      fontSize: 12,
      marginTop: 2,
    },
    separator: {
      height: 1,
      backgroundColor: theme.border,
      width: '100%',
      opacity: 0.3,
      marginVertical: 12,
    },
    settingsContainer: {
      marginTop: 4,
      gap: 12,
    },
    settingsTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.subtext,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      paddingVertical: 4,
    },
    settingLabel: {
      fontSize: 15,
      fontWeight: '600',
    },
    settingDescription: {
      fontSize: 12,
      opacity: 0.8,
    },
    storeLinks: {
      marginTop: 8,
      gap: 8,
    },
    storeHeader: {
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    storeRow: {
      flexDirection: 'row',
      gap: 8,
    },
    storeBtn: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    storeBtnText: {
      color: '#fff',
      fontWeight: '800',
      fontSize: 13,
    },
    qrRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 4,
    },
    qrItem: {
      flex: 1,
      alignItems: 'center',
      gap: 6,
    },
    qrCode: {
      width: 140,
      height: 140,
      borderRadius: 12,
      backgroundColor: '#fff',
    },
    qrCaption: {
      fontSize: 12,
      fontWeight: '600',
    },
  });
}