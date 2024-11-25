import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type SoundItemProps = {
  name: string;
  duration: string;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlay: () => void;
  onToggleFavorite: () => void;
};

export function SoundItem({ 
  name, 
  duration, 
  isPlaying, 
  isFavorite, 
  onPlay, 
  onToggleFavorite 
}: SoundItemProps) {
  return (
    <View style={styles.soundItem}>
      <View style={styles.soundInfo}>
        <Text style={styles.soundName}>{name}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          onPress={onToggleFavorite}
          style={styles.favoriteButton}
        >
          <FontAwesome 
            name={isFavorite ? "heart" : "heart-o"} 
            size={20} 
            color={isFavorite ? "#9BCE22" : "#666"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onPlay}
          style={[styles.playButton, isPlaying && styles.playingButton]}
        >
          <FontAwesome 
            name={isPlaying ? "stop" : "play"} 
            size={16} 
            color="#fff" 
          />
          <Text style={styles.playButtonText}>
            {isPlaying ? 'Stop' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  soundItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  soundInfo: {
    flex: 1,
  },
  soundName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  favoriteButton: {
    padding: 8,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9BCE22',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  playingButton: {
    backgroundColor: '#666',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
  },
}); 