import { useEffect } from 'react';
import { router, Redirect } from 'expo-router';
import { useAuth } from './context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#9BCE22" />
      </View>
    );
  }

  // Use Redirect instead of programmatic navigation
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/login" />;
} 