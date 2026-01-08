import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import AccountScreen from '../components/AccountScreen';
import { auth } from '../firebaseConfig';
import { ThemeProvider, useTheme } from '../theme';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const prevIsLoggedIn = useRef<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const loggedIn = !!user;

      // If we were explicitly logged out and now we are logged in, 
      // redirect to home to reset any deep-linked state (like the rate modal)
      if (prevIsLoggedIn.current === false && loggedIn === true) {
        // Use replace to ensure we reset the stack
        router.replace('/');
      }

      setIsLoggedIn(loggedIn);
      prevIsLoggedIn.current = loggedIn;
    });
    return unsubscribe;
  }, []);

  // Show loading while checking auth state
  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show account screen if not logged in
  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <AccountScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AuthenticatedStack />
    </ThemeProvider>
  );
}

function AuthenticatedStack() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Sets the root view background color to match the theme
    // This fixes the white flash/border during transitions
    SystemUI.setBackgroundColorAsync(theme.background);
  }, [theme.background]);

  const navTheme = {
    dark: colorScheme === 'dark',
    fonts: DefaultTheme.fonts,
    colors: {
      ...(colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.message,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <NavThemeProvider value={navTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background },
            animation: 'slide_from_right', // Improve transition smoothness
          }}
        >
          <Stack.Screen
            name="room/[roomId]/rate/index"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
        </Stack>
      </NavThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
