import { useEffect, useState } from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Account from './account';
import { ThemeProvider } from '../theme';

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
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
        <Account />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="account">
          <Label>Account</Label>
          <Icon sf="person.fill" drawable="custom_settings_drawable" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
