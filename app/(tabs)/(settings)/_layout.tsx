import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="stats" options={{ title: 'Statistics' }} />
      <Stack.Screen name="sounds" options={{ title: 'Sound Preferences' }} />
      <Stack.Screen name="thresholds" options={{ title: 'Alert Thresholds' }} />
      <Stack.Screen name="device" options={{ title: 'Device Settings' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>
  );
} 