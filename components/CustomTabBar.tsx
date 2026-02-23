import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHapticFeedback, useSettings } from '../lib/SettingsContext';
import { useTheme } from '../theme';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();
  const colorScheme = useColorScheme();
  const { useBetaFeatures, showSubmitTab, showReviewsTab } = useSettings();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const normalizedPath = pathname.replace(/^\//, '');
  const isHome = normalizedPath === '' || normalizedPath === 'index';
  const isAccount = normalizedPath === 'account';
  const isAdd = normalizedPath === 'add';
  const isReviews = normalizedPath === 'reviews';
  const isOSU = normalizedPath === 'osu';
  if (Platform.OS !== 'android') {
    return null;
  }

  const TabButton = ({
    icon,
    activeIcon,
    label,
    isActive,
    onPress,
    route
  }: {
    icon: any,
    activeIcon: any,
    label: string,
    isActive: boolean,
    onPress: () => void,
    route: string
  }) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.spring(scale, {
        toValue: isActive ? 1.1 : 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40
      }).start();
    }, [isActive]);

    return (
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          triggerHaptic();
          onPress();
        }}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
          <Ionicons
            name={isActive ? activeIcon : icon}
            size={24}
            color={isActive ? theme.primary : theme.subtext}
          />
          <Text style={[
            styles.label,
            {
              color: isActive ? theme.primary : theme.subtext,
              fontWeight: isActive ? '700' : '500'
            }
          ]}>
            {label}
          </Text>
        </Animated.View>
        {isActive && (
          <View style={[styles.activeIndicator, { backgroundColor: theme.primary }]} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.absoluteContainer, { bottom: Math.max(insets.bottom, 16) }]}>
      <BlurView
        intensity={90}
        tint={colorScheme === 'dark' ? 'dark' : 'extraLight'}
        style={styles.blurWrapper}
      >
        <View style={[styles.container, {
          backgroundColor: colorScheme === 'dark' ? 'rgba(28, 28, 30, 0.5)' : 'rgba(255, 255, 255, 0.4)',
        }]}>
          <TabButton
            icon="grid-outline"
            activeIcon="grid"
            label="Rooms"
            isActive={isHome}
            route="/"
            onPress={() => router.push('/')}
          />

          {showSubmitTab && (
            <TabButton
              icon="add-circle-outline"
              activeIcon="add-circle"
              label="Add"
              isActive={isAdd}
              route="/add"
              onPress={() => router.push('/add')}
            />
          )}

          {useBetaFeatures && (
            <TabButton
              icon="link-outline"
              activeIcon="link"
              label="OSU"
              isActive={isOSU}
              route="/osu"
              onPress={() => router.push('/osu')}
            />
          )}

          {showReviewsTab && (
            <TabButton
              icon="star-outline"
              activeIcon="star"
              label="Reviews"
              isActive={isReviews}
              route="/reviews"
              onPress={() => router.push('/reviews')}
            />
          )}

          <TabButton
            icon="person-outline"
            activeIcon="person"
            label="Account"
            isActive={isAccount}
            route="/account"
            onPress={() => router.push('/account')}
          />
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    left: '4%',
    right: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  blurWrapper: {
    borderRadius: 40,
    overflow: 'hidden',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  container: {
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});