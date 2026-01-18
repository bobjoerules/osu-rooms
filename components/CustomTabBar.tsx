import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHapticFeedback } from '../lib/SettingsContext';
import { useTheme } from '../theme';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();

  const isHome = pathname === '/' || pathname === '/index';
  const isAccount = pathname === '/account';
  const isSubmit = pathname === '/submit';

  return (
    <View style={[styles.container, {
      paddingBottom: insets.bottom,
      backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.8)' : theme.background,
      borderTopColor: theme.border,
    }]}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          triggerHaptic();
          router.push('/submit');
        }}
      >
        <Ionicons
          name={isSubmit ? 'add-circle' : 'add-circle-outline'}
          size={24}
          color={isSubmit ? '#D73F09' : theme.subtext}
        />
        <Text style={[styles.label, { color: isSubmit ? '#D73F09' : theme.subtext }]}>Add Room</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          triggerHaptic();
          router.push('/');
        }}
      >
        <Ionicons
          name={isHome ? 'grid' : 'grid-outline'}
          size={24}
          color={isHome ? '#D73F09' : theme.subtext}
        />
        <Text style={[styles.label, { color: isHome ? '#D73F09' : theme.subtext }]}>Rooms</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          triggerHaptic();
          router.push('/account');
        }}
      >
        <Ionicons
          name={isAccount ? 'person' : 'person-outline'}
          size={24}
          color={isAccount ? '#D73F09' : theme.subtext}
        />
        <Text style={[styles.label, { color: isAccount ? '#D73F09' : theme.subtext }]}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    ...(Platform.OS === 'ios' && {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backdropFilter: 'blur(10px)',
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
});
