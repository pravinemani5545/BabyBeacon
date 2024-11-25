import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const settingsGroups = [
  {
    title: 'Monitoring',
    items: [
      { id: 'notifications', icon: 'bell', title: 'Notifications', route: 'notifications' },
      { id: 'stats', icon: 'bar-chart', title: 'Statistics', route: 'stats' },
      { id: 'thresholds', icon: 'sliders', title: 'Alert Thresholds', route: 'thresholds' }
    ]
  },
  {
    title: 'Sound Settings',
    items: [
      { id: 'sounds', icon: 'music', title: 'Sound Preferences', route: 'sounds' },
      { id: 'triggers', icon: 'bolt', title: 'Sound Triggers', route: 'triggers' }
    ]
  },
  {
    title: 'Device',
    items: [
      { id: 'device', icon: 'cog', title: 'Device Settings', route: 'device' },
      { id: 'about', icon: 'info-circle', title: 'About', route: 'about' }
    ]
  }
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {settingsGroups.map((group) => (
        <View key={group.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{group.title}</Text>
          {group.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingItem}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.settingLeft}>
                <FontAwesome name={item.icon} size={20} color="#666" />
                <Text style={styles.settingText}>{item.title}</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
}); 