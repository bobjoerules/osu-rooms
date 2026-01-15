import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { useTheme } from '../theme';
import { useHapticFeedback } from '../lib/SettingsContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isExpanded: boolean;
  onPress: () => void;
  image?: string | number;
  showImage?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isExpanded, onPress, image, showImage }) => {
  const theme = useTheme();
  const triggerHaptic = useHapticFeedback();

  const handlePress = () => {
    triggerHaptic();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onPress();
  };

  return (
    <View style={[styles.itemContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
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
  items: Array<{
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    image?: string | number;
    showImage?: boolean;
  }>;
  forceExpandAll?: boolean;
}

export default function Accordion({ items, forceExpandAll = false }: AccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={Platform.OS === 'web' ? styles.webGridContainer : undefined}>
      <View style={Platform.OS === 'web' ? styles.gridWrapper : undefined}>
        {items.map((item) => {
          const isExpanded = forceExpandAll || expandedId === item.id;

          return (
            <View key={item.id} style={Platform.OS === 'web' ? styles.gridItem : undefined}>
              <AccordionItem
                title={item.title}
                isExpanded={isExpanded}
                onPress={() => toggleItem(item.id)}
                image={item.image}
                showImage={item.showImage}
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
  },
  gridItem: {
    width: 'calc(33.333% - 11px)',
    marginBottom: 8,
  },
  itemContainer: {
    marginVertical: 8,
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
