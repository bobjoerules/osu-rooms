import NetInfo from '@react-native-community/netinfo';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from 'expo-router';
import Head from 'expo-router/head';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, LogBox, Platform, StyleSheet, useColorScheme, View } from 'react-native';
import AccountScreen from '../components/AccountScreen';
import NoInternetScreen from '../components/NoInternetScreen';
import { auth } from '../firebaseConfig';
import { DatabaseProvider } from '../lib/DatabaseContext';
import { SettingsProvider } from '../lib/SettingsContext';
import { ThemeProvider, useTheme } from '../theme';

LogBox.ignoreLogs([
  'functionality is not fully supported in Expo Go',
  'Android Push notifications (remote notifications) functionality provided by expo-notifications was removed',
  'Listening to push token changes is not yet fully supported on web',
  '`expo-notifications` functionality is not fully supported in Expo Go',
]);

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true
    }),
  });
}

SplashScreen.preventAutoHideAsync();

const useNotificationResponse = Platform.OS === 'web' ? () => null : Notifications.useLastNotificationResponse;

function RootContent() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [localLoaded, setLocalLoaded] = useState(false);
  const prevIsLoggedIn = useRef<boolean | null>(null);
  const router = useRouter();
  const response = useNotificationResponse();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response && 'notification' in response) {
      const roomId = response.notification.request.content.data.roomId;
      if (roomId) {
        router.push(`/room/${roomId}`);
      }
    }
  }, [response]);

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
    return () => unsubscribe();
  }, [router]);

  if (isConnected === false) {
    return <NoInternetScreen />;
  }

  if (isLoggedIn === null || !localLoaded || isConnected === null) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <AccountScreen />;
  }

  return <AuthenticatedStack />;
}

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <SettingsProvider>
        <DatabaseProvider>
          <ThemeProvider>
            <ThemeManager />
            <RootContent />
          </ThemeProvider>
        </DatabaseProvider>
      </SettingsProvider>
    </View>
  );
}

function ThemeManager() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background);
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.background);
      NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark');
    }
  }, [theme.background, colorScheme]);

  return null;
}


function LoadingScreen() {
  return (
    <View style={[styles.loadingContainer, { backgroundColor: '#000000' }]}>
      <ActivityIndicator size="large" color="#D73F09" />
    </View>
  );
}

function AuthenticatedStack() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

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
        <Head>
          <title>OSU Rooms</title>
          <meta name="description" content="Rate and explore OSU rooms with photos and ratings." />
          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="OSU Rooms" />
          <meta property="og:description" content="Rate and explore OSU rooms with photos and ratings." />
          <meta property="og:image" content="/favicon.png" />
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="OSU Rooms" />
          <meta name="twitter:description" content="Rate and explore OSU rooms with photos and ratings." />
          <meta name="twitter:image" content="/favicon.png" />
          {/* Ensure Apple touch icon uses icon.png (copied as favicon) */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        </Head>
      )}
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
              background-color: ${theme.background};
              margin: 0;
              padding: 0;
            }
            #root {
              display: flex;
              flex-direction: column;
              height: 100%;
              background-color: ${theme.background};
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
