import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, useColorScheme, View } from 'react-native';
import AccountScreen from '../components/AccountScreen';
import { auth } from '../firebaseConfig';
import { SettingsProvider } from '../lib/SettingsContext';
import { ThemeProvider, useTheme } from '../theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [localLoaded, setLocalLoaded] = useState(false);
  const prevIsLoggedIn = useRef<boolean | null>(null);
  const router = useRouter();

  const [loaded, error] = useFonts({
    'Ionicons': require('../assets/fonts/Ionicons.ttf'),
    'FontAwesome': require('../assets/fonts/FontAwesome.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      setLocalLoaded(true);
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const loggedIn = !!user;

      if (prevIsLoggedIn.current === false && loggedIn === true) {
        router.replace('/');
      }

      setIsLoggedIn(loggedIn);
      prevIsLoggedIn.current = loggedIn;
    });
    return unsubscribe;
  }, []);

  if (isLoggedIn === null || !localLoaded) {
    return (
      <SettingsProvider>
        <ThemeProvider>
          <LoadingScreen />
        </ThemeProvider>
      </SettingsProvider>
    );
  }

  if (!isLoggedIn) {
    return (
      <SettingsProvider>
        <ThemeProvider>
          <AccountScreen />
        </ThemeProvider>
      </SettingsProvider>
    );
  }

  return (
    <SettingsProvider>
      <ThemeProvider>
        <AuthenticatedStack />
      </ThemeProvider>
    </SettingsProvider>
  );
}

function LoadingScreen() {
  const theme = useTheme();
  return (
    <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.subtext} />
    </View>
  );
}

function AuthenticatedStack() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
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
      {Platform.OS === 'web' && (
        <style>
          {`
            :root {
              --expo-router-tabs-background-color: ${theme.card} !important;
            }
            .EFtDwW_navigationMenuRoot {
              background-color: ${theme.card} !important;
              border-bottom: 1px solid ${theme.border}44 !important;
            }
            .EFtDwW_navigationMenuTrigger[data-state='active'] {
              background-color: ${theme.primary} !important;
            }
            .EFtDwW_navigationMenuTrigger[data-state='active'] span {
              color: #ffffff !important;
            }
            .EFtDwW_navigationMenuTrigger[data-state='active'] svg {
              color: #ffffff !important;
            }
          `}
        </style>
      )}
      <NavThemeProvider value={navTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="room/[roomId]/rate/index"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="admin"
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </Stack>
        {Platform.OS === 'web' && (
          <style dangerouslySetInnerHTML={{
            __html: `
            html, body {
              overflow: hidden;
              height: 100%;
              width: 100%;
            }
            #root {
              display: flex;
              flex-direction: column;
              height: 100%;
            }
            /* Target the main scroll view or content container */
            [data-testid="scroll-view"], .css-view-175oi2r[style*="overflow-y: auto"] {
              padding-bottom: 50px; /* Space for tab bar */
            }
            /* Hide scrollbar for Chrome, Safari and Opera */
            ::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            html, body, [data-testid="scroll-view"] {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}} />
        )}
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
