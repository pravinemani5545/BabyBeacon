import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';
import { MonitoringProvider } from './context/MonitoringContext';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <MonitoringProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </MonitoringProvider>
    </ThemeProvider>
  );
}
