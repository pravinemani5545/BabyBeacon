import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useState } from 'react';
import type { NotificationSetting } from '../../types';

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'crying',
    title: 'Crying Alerts',
    description: 'Get notified when baby is crying',
    enabled: true,
  },
  {
    id: 'movement',
    title: 'Movement Detection',
    description: 'Alert when unusual movement is detected',
    enabled: true,
  },
  {
    id: 'sleep',
    title: 'Sleep Updates',
    description: 'Receive updates about sleep patterns',
    enabled: false,
  },
  {
    id: 'sound',
    title: 'Loud Sounds',
    description: 'Alert for unexpected loud noises',
    enabled: true,
  },
];

export default function NotificationsScreen() {
  const [settings, setSettings] = useState(
    new Map(NOTIFICATION_SETTINGS.map(setting => [setting.id, setting.enabled]))
  );

  const toggleSetting = (id: string) => {
    setSettings(current => {
      const newSettings = new Map(current);
      newSettings.set(id, !current.get(id));
      return newSettings;
    });
  };

  return (
    <ScrollView style={styles.container}>
      {NOTIFICATION_SETTINGS.map(setting => (
        <View key={setting.id} style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>{setting.title}</Text>
            <Text style={styles.settingDescription}>{setting.description}</Text>
          </View>
          <Switch
            value={settings.get(setting.id)}
            onValueChange={() => toggleSetting(setting.id)}
            trackColor={{ false: '#ddd', true: '#9BCE22' }}
            thumbColor={'#fff'}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 