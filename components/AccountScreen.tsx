import Constants from "expo-constants";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  writeBatch
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebaseConfig";
import { Theme, useTheme } from "../theme";

export default function Account() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
  const [message, setMessage] = useState<string | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);

  const version = Constants.expoConfig?.version || "1.0.0";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUserEmail(user?.email ?? null);
      setUserName(user?.displayName ?? null);

      if (user) {
        // 1. Check if user is admin
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
        }

        // 2. Fetch user count
        try {
          const coll = collection(db, "users");
          const snapshot = await getCountFromServer(coll);
          setUserCount(snapshot.data().count);
        } catch (err) {
          console.error("Error fetching user count:", err);
        }
      } else {
        setIsAdmin(false);
        setUserCount(null);
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

        // 1. Check if username is taken in Firestore
        const nameRef = doc(db, "usernames", lowerName);
        const nameSnap = await getDoc(nameRef);

        if (nameSnap.exists()) {
          setMessage("Username is already taken.");
          setLoading(false);
          return;
        }

        // 2. Create Auth User
        const result = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        // 3. Update Auth Profile
        await updateProfile(result.user, { displayName: trimmedName });

        // 4. Reserve username and create user doc in Firestore
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
      }
      if (
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential" ||
        code === "auth/missing-password"
      ) {
        setPasswordError("Check your password.");
      }
      if (code === "auth/weak-password") {
        setPasswordError("Password is too weak (min 6 characters).");
      }
      setMessage(`${context} failed${code ? ` (${code})` : ""}: ${friendly}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {userEmail ? "Account" : isSignup ? "Sign up" : "Sign in"}
        </Text>
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
            {userName && (
              <>
                <Text style={styles.label}>Username</Text>
                <Text style={styles.value}>{userName}</Text>
              </>
            )}
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userEmail}</Text>

            <Pressable style={styles.buttonSecondary} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
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
          {userCount !== null ? `Users: ${userCount} • ` : ""}Version {version}
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
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    header: {
      marginBottom: 16,
      gap: 4,
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
      backgroundColor: theme.destructive,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 8,
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
    adminSection: {
      marginTop: 20,
      gap: 12,
    },
    separator: {
      height: 1,
      backgroundColor: theme.border,
      width: '100%',
      opacity: 0.5,
    },
  });
}