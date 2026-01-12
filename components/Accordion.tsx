import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
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
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isExpanded, onPress }) => {
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
  }>;
  forceExpandAll?: boolean;
}

export default function Accordion({ items, forceExpandAll = false }: AccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View>
      {items.map((item) => {
        const isExpanded = forceExpandAll || expandedId === item.id;

        return (
          <AccordionItem
            key={item.id}
            title={item.title}
            isExpanded={isExpanded}
            onPress={() => toggleItem(item.id)}
          >
            {item.content}
          </AccordionItem>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
  content: {
    borderTopWidth: 1,
  },
});
