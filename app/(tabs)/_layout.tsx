import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#9BCE22',
      tabBarInactiveTintColor: '#687076',
      headerStyle: {
        backgroundColor: '#F8FFED'
      },
      headerTitle: "BabyBeacon",
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="audio"
        options={{
          title: 'Sounds',
          tabBarIcon: ({ color }) => <FontAwesome name="music" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="monitor"
        options={{
          title: 'Monitor',
          tabBarIcon: ({ color }) => <FontAwesome name="camera" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
} 