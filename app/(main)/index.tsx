import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from '../../components/Accordion';
import RoomList from '../../components/RoomList';
import { BUILDINGS_DATA } from '../../data/rooms';
import { Theme, useTheme } from '../../theme';



export default function Index() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');

  const accordionItems = useMemo(() => {
    // 1. Filter
    const filtered = BUILDINGS_DATA.map(building => {
      const buildingNameMatch = building.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchingRooms = building.rooms.filter(room => {
        const nameMatch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
        const aliasMatch = room.searchAliases?.some(alias =>
          alias.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return nameMatch || aliasMatch;
      });

      // If building name matches, show all rooms.
      if (buildingNameMatch) {
        return { ...building };
      }

      // If rooms match, show building with those rooms.
      if (matchingRooms.length > 0) {
        return { ...building, rooms: matchingRooms };
      }

      return null;
    }).filter((item): item is typeof BUILDINGS_DATA[0] => item !== null);

    // 2. Sort Alphabetically by Building Name
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    // 3. Map to Accordion Items
    return filtered.map(building => ({
      id: building.id,
      title: building.name,
      content: <RoomList rooms={building.rooms} />,
    }));
  }, [searchQuery]);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.header}>
        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={theme.subtext} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search buildings or rooms..."
            placeholderTextColor={theme.subtext}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <Accordion items={accordionItems} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.background,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      gap: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
  });
}
