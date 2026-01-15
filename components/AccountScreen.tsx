import Constants from "expo-constants";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  where,
  writeBatch
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebaseConfig";
import { Theme, useTheme } from "../theme";
import { useSettings, useHapticFeedback } from "../lib/SettingsContext";
import { BUILDINGS_DATA } from "../data/rooms";

export default function Account() {
  const theme = useTheme();
  const { showPlaceholders, setShowPlaceholders, useHaptics, setUseHaptics, showBuildingImages, setShowBuildingImages } = useSettings();
  const triggerHaptic = useHapticFeedback();
  const router = useRouter();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const totalRooms = useMemo(() => {
    return BUILDINGS_DATA.reduce((acc, building) => acc + building.rooms.length, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);

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

              // Fetch pending submissions count for admin
              const submissionsColl = collection(db, "submissions");
              const q = query(submissionsColl, where("status", "==", "pending"));
              const snapshot = await getCountFromServer(q);
              setPendingCount(snapshot.data().count);
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



  async function handleSubmit() {
    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }
    if (isSignup && !username.trim()) {
      setMessage("Username is required.");
      return;
    }
    setLoading(true);
    setMessage(null);
    setEmailError(null);
    setPasswordError(null);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setMessage("Signed in!");
      } else {
        const trimmedName = username.trim();
        const lowerName = trimmedName.toLowerCase();

        const nameRef = doc(db, "usernames", lowerName);
        const nameSnap = await getDoc(nameRef);

        if (nameSnap.exists()) {
          setMessage("Username is already taken.");
          setLoading(false);
          return;
        }

        const result = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        await updateProfile(result.user, { displayName: trimmedName });

        const batch = writeBatch(db);
        batch.set(nameRef, { uid: result.user.uid });
        batch.set(doc(db, "users", result.user.uid), {
          username: trimmedName,
          role: "user",
          email: email.trim(),
        });
        await batch.commit();

        setMessage("Account created and signed in.");
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
        setMessage(`${context} failed${code ? ` (${code})` : ""}: ${friendly}`);
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
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      const friendly =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessage(`Sign out failed${code ? ` (${code})` : ""}: ${friendly}`);
    }
  }

  const isSignup = mode === "signup";
  const isDisabled = isSignup
    ? !email.trim() || !password.trim() || !username.trim()
    : !email.trim() || !password.trim();

  return (
    <SafeAreaView style={[styles.container, !userEmail && styles.containerCentered]}>
      <View style={styles.header}>
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
        </View>
        <Text style={styles.headerSubtitle}>
          {userEmail
            ? "Signed in with email"
            : isSignup
              ? "Create an account to continue"
              : "Welcome back"}
        </Text>
      </View>
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

            <Pressable style={[styles.buttonSecondary, { marginTop: 20 }]} onPress={handleSignOut}>
              <Text style={[styles.buttonText, { color: theme.text }]}>Sign out</Text>
            </Pressable>

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
                    router.push("/admin" as any);
                  }}
                >
                  <View style={styles.adminCardContent}>
                    <View style={styles.adminIconContainer}>
                      <Ionicons name="documents-outline" size={22} color={theme.primary} />
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
                  thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
                  activeThumbColor="#fff"
                  activeTrackColor={theme.primary}
                />
              </View>

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
                  activeThumbColor="#fff"
                  activeTrackColor={theme.primary}
                />
              </View>

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
                  thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
                  activeThumbColor="#fff"
                  activeTrackColor={theme.primary}
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
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={theme.placeholder}
              style={[styles.input, passwordError && styles.inputError]}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            {isSignup && (
              <TextInput
                placeholder="Username"
                placeholderTextColor={theme.placeholder}
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
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
                setMode(isSignup ? "login" : "signup");
                setMessage(null);
                setEmailError(null);
                setPasswordError(null);
              }}
            >
              <Text style={styles.linkText}>
                {isSignup
                  ? "Have an account? Sign in"
                  : "Need an account? Sign up"}
              </Text>
            </Pressable>
          </View>
        )}

        {message && <Text style={styles.message}>{message}</Text>}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {userCount !== null ? `Users: ${userCount} • ` : ""}Rooms: {totalRooms} • Version {version}
        </Text>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    containerCentered: {
      justifyContent: "center",
      paddingTop: 0,
    },
    header: {
      marginBottom: 16,
      gap: 4,
      width: "100%",
      maxWidth: 400,
    },
    headerTitle: {
      color: theme.text,
      fontSize: 28,
      fontWeight: "700",
    },
    headerSubtitle: {
      color: theme.subtext,
      fontSize: 16,
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
      borderWidth: 1,
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
      backgroundColor: theme.primary + '15',
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
  });
}