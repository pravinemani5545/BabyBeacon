import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useMonitoring } from '../context/MonitoringContext';
import type { ActivityStatus } from '../types';

export default function MonitorScreen() {
  const { stats, lastUpdate } = useMonitoring();
  const [lastSnapshot, setLastSnapshot] = useState<string>('2:45 PM');
  const [currentActivity, setCurrentActivity] = useState<ActivityStatus>('sleeping');

  const handleTakeSnapshot = () => {
    console.log('Taking new snapshot...');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit'
    });
    setLastSnapshot(timeString);
    console.log(`Snapshot taken at ${timeString}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.monitorView}>
        <View style={styles.feedPlaceholder}>
          <FontAwesome name="camera" size={40} color="#666" />
          <Text style={styles.placeholderText}>Latest Snapshot</Text>
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityText}>
            Activity Detected: {currentActivity.charAt(0).toUpperCase() + currentActivity.slice(1)}
          </Text>
          <Text style={styles.timeText}>
            Snapshot from {lastSnapshot}
          </Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Current Stats</Text>
        <View style={styles.statsGrid}>
          <StatCard icon="moon-o" label="Sleep Quality" value={stats.sleepQuality} />
          <StatCard icon="heartbeat" label="Movement" value={stats.movement} />
          <StatCard icon="volume-up" label="Sound Level" value={stats.soundLevel} />
          <StatCard icon="thermometer-half" label="Room Temp" value={stats.temperature} />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleTakeSnapshot}
        >
          <Text style={styles.actionButtonText}>Take New Snapshot</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Stat Card Component
function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <FontAwesome name={icon} size={24} color="#9BCE22" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
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
  monitorView: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  feedPlaceholder: {
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  placeholderText: {
    marginTop: 8,
    color: '#666',
    fontSize: 16,
  },
  activityInfo: {
    padding: 16,
  },
  activityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  actions: {
    marginTop: 24,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#9BCE22',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 