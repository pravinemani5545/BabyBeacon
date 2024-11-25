import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import type { MonitoringThreshold } from '../../types';

const THRESHOLDS: MonitoringThreshold[] = [
  { id: 'cry_sensitivity', name: 'Crying Detection Sensitivity', value: 0.7, unit: '%' },
  { id: 'motion_sensitivity', name: 'Motion Detection Sensitivity', value: 0.6, unit: '%' },
  { id: 'noise_threshold', name: 'Background Noise Threshold', value: 0.4, unit: '%' },
  { id: 'alert_delay', name: 'Alert Delay', value: 0.3, unit: 's' },
];

export default function ThresholdsScreen() {
  const [thresholds, setThresholds] = useState(new Map(THRESHOLDS.map(t => [t.id, t.value])));

  return (
    <ScrollView style={styles.container}>
      {THRESHOLDS.map(threshold => (
        <View key={threshold.id} style={styles.thresholdItem}>
          <Text style={styles.thresholdTitle}>{threshold.name}</Text>
          <View style={styles.sliderContainer}>
            <Slider
              value={thresholds.get(threshold.id)}
              onValueChange={(value) => {
                setThresholds(new Map(thresholds).set(threshold.id, value));
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#9BCE22"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#9BCE22"
            />
            <Text style={styles.thresholdValue}>
              {Math.round(thresholds.get(threshold.id)! * 100)}{threshold.unit}
            </Text>
          </View>
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
  thresholdItem: {
    marginBottom: 24,
  },
  thresholdTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sliderContainer: {
    marginTop: 8,
  },
  thresholdValue: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
}); 