import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useMonitoring } from '../context/MonitoringContext';

const RECENT_ACTIVITIES = [
  {
    id: '1',
    type: 'status',
    icon: 'bed',
    title: 'Started Sleeping',
    time: '15 mins ago',
    color: '#9BCE22'
  },
  {
    id: '2',
    type: 'alert',
    icon: 'volume-up',
    title: 'Crying Detected',
    time: '45 mins ago',
    color: '#FF4444'
  },
  {
    id: '3',
    type: 'movement',
    icon: 'child',
    title: 'Movement Detected',
    time: '1 hour ago',
    color: '#FFA500'
  },
  {
    id: '4',
    type: 'temperature',
    icon: 'thermometer-half',
    title: 'Room Temperature Normal',
    time: '2 hours ago',
    color: '#4CAF50'
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const { babyStatus, lastUpdate } = useMonitoring();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Current Status</Text>
        <View style={styles.statusContent}>
          <FontAwesome name="child" size={32} color="#9BCE22" />
          <Text style={styles.statusText}>{babyStatus}</Text>
          <Text style={styles.statusTime}>Last updated: {lastUpdate}</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/audio')}
          >
            <FontAwesome name="music" size={36} color="#333" />
            <Text style={styles.actionText}>Play Sounds</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/monitor')}
          >
            <FontAwesome name="camera" size={36} color="#333" />
            <Text style={styles.actionText}>View Monitor</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {RECENT_ACTIVITIES.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.color + '15' }]}>
                <FontAwesome name={activity.icon} size={20} color={activity.color} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
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
  statusCard: {
    backgroundColor: '#F8FFED',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusTime: {
    fontSize: 12,
    color: '#666',
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 120,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  recentActivity: {
    marginBottom: 24,
  },
  activityList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  }
}); 