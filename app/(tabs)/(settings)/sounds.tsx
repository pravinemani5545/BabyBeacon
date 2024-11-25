import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';

const SOUND_PREFERENCES = [
  { id: 'auto_play', title: 'Auto-play on crying', description: 'Automatically play soothing sounds when crying is detected' },
  { id: 'fade', title: 'Fade In/Out', description: 'Gradually change volume when starting or stopping' },
  { id: 'loop', title: 'Loop Sounds', description: 'Continuously play sounds until manually stopped' },
];

export default function SoundPreferencesScreen() {
  const [preferences, setPreferences] = useState(new Map(SOUND_PREFERENCES.map(pref => [pref.id, true])));
  const [defaultVolume, setDefaultVolume] = useState(0.7);
  const [fadeTime, setFadeTime] = useState(0.5);

  return (
    <ScrollView style={styles.container}>
      {SOUND_PREFERENCES.map(pref => (
        <View key={pref.id} style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>{pref.title}</Text>
            <Text style={styles.preferenceDescription}>{pref.description}</Text>
          </View>
          <Switch
            value={preferences.get(pref.id)}
            onValueChange={(value) => {
              setPreferences(new Map(preferences).set(pref.id, value));
            }}
            trackColor={{ false: '#ddd', true: '#9BCE22' }}
            thumbColor={'#fff'}
          />
        </View>
      ))}

      <View style={styles.sliderSection}>
        <Text style={styles.sliderTitle}>Default Volume</Text>
        <Slider
          value={defaultVolume}
          onValueChange={setDefaultVolume}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#9BCE22"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#9BCE22"
        />
        <Text style={styles.sliderValue}>{Math.round(defaultVolume * 100)}%</Text>
      </View>

      <View style={styles.sliderSection}>
        <Text style={styles.sliderTitle}>Fade Duration</Text>
        <Slider
          value={fadeTime}
          onValueChange={setFadeTime}
          minimumValue={0}
          maximumValue={2}
          minimumTrackTintColor="#9BCE22"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#9BCE22"
        />
        <Text style={styles.sliderValue}>{fadeTime.toFixed(1)}s</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#666',
  },
  sliderSection: {
    marginTop: 24,
  },
  sliderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
}); 