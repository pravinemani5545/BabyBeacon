import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useState, useCallback, useMemo } from 'react';

const SOUND_CATEGORIES = [
  {
    id: 'lullabies',
    title: 'Lullabies',
    sounds: [
      { id: '1', name: 'Soft Lullaby', duration: '3:45', favorite: true },
      { id: '2', name: 'Twinkle Twinkle', duration: '2:30', favorite: false },
      { id: '3', name: 'Rock-a-bye Baby', duration: '3:15', favorite: true },
    ]
  },
  {
    id: 'nature',
    title: 'Nature Sounds',
    sounds: [
      { id: '4', name: 'Ocean Waves', duration: '5:00', favorite: false },
      { id: '5', name: 'Rainfall', duration: '10:00', favorite: false },
      { id: '6', name: 'Forest Birds', duration: '8:00', favorite: false },
    ]
  },
  {
    id: 'white-noise',
    title: 'White Noise',
    sounds: [
      { id: '7', name: 'Fan Sound', duration: '∞', favorite: false },
      { id: '8', name: 'Gentle Static', duration: '∞', favorite: false },
    ]
  }
];

export default function AudioScreen() {
  const [volume, setVolume] = useState(0.5);
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '3']));

  const handlePlay = useCallback((soundId: string) => {
    const sound = SOUND_CATEGORIES
      .flatMap(category => category.sounds)
      .find(s => s.id === soundId);
    
    console.log(`${playingSound === soundId ? 'Stopping' : 'Playing'} sound: ${sound?.name}`);
    setPlayingSound(current => current === soundId ? null : soundId);
  }, []);

  const toggleFavorite = useCallback((soundId: string) => {
    console.log(`Toggling favorite for sound ID: ${soundId}`);
    setFavorites(current => {
      const newFavorites = new Set(current);
      if (newFavorites.has(soundId)) {
        newFavorites.delete(soundId);
        console.log(`Removed ${soundId} from favorites`);
      } else {
        newFavorites.add(soundId);
        console.log(`Added ${soundId} to favorites`);
      }
      return newFavorites;
    });
  }, []);

  // Get all favorite sounds across categories
  const favoriteSounds = useMemo(() => {
    return SOUND_CATEGORIES.flatMap(category => 
      category.sounds.filter(sound => favorites.has(sound.id))
    );
  }, [favorites]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.volumeSection}>
        <View style={styles.volumeHeader}>
          <Text style={styles.volumeTitle}>Volume</Text>
          <FontAwesome name="volume-up" size={24} color="#666" />
        </View>
        <Slider
          style={styles.slider}
          value={volume}
          onValueChange={setVolume}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#9BCE22"
          maximumTrackTintColor="#ddd"
        />
      </View>

      {/* Favorites Section */}
      {favoriteSounds.length > 0 && (
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Favorites</Text>
          <View style={styles.soundsList}>
            {favoriteSounds.map(sound => (
              <TouchableOpacity
                key={sound.id}
                style={styles.soundItem}
                onPress={() => handlePlay(sound.id)}
              >
                <View style={styles.soundInfo}>
                  <Text style={styles.soundName}>{sound.name}</Text>
                  <Text style={styles.duration}>{sound.duration}</Text>
                </View>
                <View style={styles.soundControls}>
                  <TouchableOpacity onPress={() => toggleFavorite(sound.id)}>
                    <FontAwesome 
                      name="heart" 
                      size={20} 
                      color="#ff4444"
                    />
                  </TouchableOpacity>
                  <FontAwesome 
                    name={playingSound === sound.id ? 'pause' : 'play'} 
                    size={20} 
                    color="#9BCE22" 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Regular Categories */}
      {SOUND_CATEGORIES.map(category => (
        <View key={category.id} style={styles.category}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={styles.soundsList}>
            {category.sounds.map(sound => (
              <TouchableOpacity
                key={sound.id}
                style={styles.soundItem}
                onPress={() => handlePlay(sound.id)}
              >
                <View style={styles.soundInfo}>
                  <Text style={styles.soundName}>{sound.name}</Text>
                  <Text style={styles.duration}>{sound.duration}</Text>
                </View>
                <View style={styles.soundControls}>
                  <TouchableOpacity onPress={() => toggleFavorite(sound.id)}>
                    <FontAwesome 
                      name="heart" 
                      size={20} 
                      color={favorites.has(sound.id) ? '#ff4444' : '#ddd'} 
                    />
                  </TouchableOpacity>
                  <FontAwesome 
                    name={playingSound === sound.id ? 'pause' : 'play'} 
                    size={20} 
                    color="#9BCE22" 
                  />
                </View>
              </TouchableOpacity>
            ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  soundCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  soundPlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundName: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
  playButton: {
    backgroundColor: '#9BCE22',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  playButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  volumeControl: {
    marginTop: 20,
    marginBottom: 20,
  },
  volumeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  bottomSpacing: {
    height: 40,
  },
  volumeSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  volumeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  volumeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  soundsList: {
    gap: 8,
  },
  soundItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  soundInfo: {
    flex: 1,
  },
  soundControls: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  soundName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  }
}); 