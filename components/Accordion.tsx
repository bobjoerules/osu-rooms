import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View, useWindowDimensions } from 'react-native';
import { useHapticFeedback } from '../lib/SettingsContext';
import { useTheme } from '../theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isExpanded: boolean;
  onPress: () => boolean; // Return true to prevent default toggle
  image?: string | number;
  showImage?: boolean;
  containerStyle?: any;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isExpanded, onPress, image, showImage, containerStyle }) => {
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();

  const handlePress = () => {
    triggerHaptic();
    const preventDefault = onPress();
    if (!preventDefault) {
      // Use simpler, faster animation
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  };

  return (
    <View style={[containerStyle, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          {typeof title === 'string' ? (
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          ) : (
            title
          )}
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.subtext}
        />
      </TouchableOpacity>
      {!isExpanded && image && showImage && (
        <TouchableOpacity
          style={[styles.imageContainer, { borderTopColor: theme.border }]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={[theme.card, 'transparent']}
            style={styles.gradientOverlay}
            pointerEvents="none"
          />
        </TouchableOpacity>
      )}
      {isExpanded && (
        <View style={[styles.content, { borderTopColor: theme.border }]}>
          {children}
        </View>
      )}
    </View>
  );
};

interface AccordionProps {
  items: {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    image?: string | number;
    showImage?: boolean;
    onPress?: () => void;
  }[];
  forceExpandAll?: boolean;
}

export default function Accordion({ items, forceExpandAll = false }: AccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;

  const toggleItem = (id: string, customOnPress?: () => void) => {
    if (customOnPress) {
      customOnPress();
      if (isDesktopWeb) return true; // Prevent expansion on desktop
    }
    setExpandedId(expandedId === id ? null : id);
    return false;
  };

  const itemContainerStyle = [
    styles.itemContainer,
    {
      marginVertical: isDesktopWeb ? 0 : 8,
    },
  ];

  return (
    <View style={Platform.OS === 'web' ? styles.webGridContainer : undefined}>
      {Platform.OS === 'web' && (
        <style>
          {`
            @media (min-width: 768px) {
              [data-grid-wrapper] {
                flex-direction: row !important;
                flex-wrap: wrap !important;
                gap: 16px !important;
              }
              [data-grid-item] {
                width: calc(33.333% - 10.67px) !important;
                box-sizing: border-box !important;
              }
            }
          `}
        </style>
      )}
      <View style={isDesktopWeb ? styles.gridWrapper : undefined} data-grid-wrapper={isDesktopWeb ? 'true' : undefined}>
        {items.map((item) => {
          const isExpanded = forceExpandAll || expandedId === item.id;

          return (
            <View key={item.id} style={isDesktopWeb ? styles.gridItem : undefined} data-grid-item={isDesktopWeb ? 'true' : undefined}>
              <AccordionItem
                title={item.title}
                isExpanded={isExpanded}
                onPress={() => toggleItem(item.id, item.onPress)}
                image={item.image}
                showImage={item.showImage}
                containerStyle={itemContainerStyle}
              >
                {item.content}
              </AccordionItem>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webGridContainer: {
    flex: 1,
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
  },
  gridItem: {
    flex: 1,
    minWidth: '30%',
    marginBottom: 8,
  },
  itemContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: Platform.OS === 'web' ? 500 : 300,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  content: {
    borderTopWidth: 1,
  },
});
