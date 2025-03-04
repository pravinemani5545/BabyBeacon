import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { WebView } from 'react-native-webview';

export default function AudioScreen() {
  const { user, addBabyResponses, removeBabyResponses, sendResponse } = useAuth();
  const [newResponseName, setNewResponseName] = useState('');
  const [newResponseUrl, setNewResponseUrl] = useState('');
  const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
  const [playingResponse, setPlayingResponse] = useState<string | null>(null);
  const [isAddingResponse, setIsAddingResponse] = useState(false);

  useEffect(() => {
    if (user && user.scanning_baby) {
      setSelectedBaby(user.scanning_baby);
    }
  }, [user]);

  const handleAddResponse = async () => {
    if (!selectedBaby || !newResponseName || !newResponseUrl) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!newResponseUrl.includes('youtube.com') && !newResponseUrl.includes('youtu.be')) {
      Alert.alert('Error', 'Please enter a valid YouTube URL');
      return;
    }

    const success = await addBabyResponses(selectedBaby, {
      [newResponseName]: newResponseUrl
    });

    if (success) {
      Alert.alert('Success', 'Response added successfully');
      setNewResponseName('');
      setNewResponseUrl('');
      setIsAddingResponse(false);
    } else {
      Alert.alert('Error', 'Failed to add response');
    }
  };

  const handleRemoveResponse = async (responseName: string) => {
    if (!selectedBaby) return;

    const success = await removeBabyResponses(selectedBaby, [responseName]);

    if (success) {
      Alert.alert('Success', 'Response removed successfully');
      if (playingResponse === responseName) {
        setPlayingResponse(null);
      }
    } else {
      Alert.alert('Error', 'Failed to remove response');
    }
  };

  const handlePlayResponse = async (url: string) => {
    const success = await sendResponse(url);
    
    if (!success) {
      Alert.alert('Error', 'Failed to play response');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Not logged in</Text>
      </View>
    );
  }

  // Get responses for selected baby
  const babyResponses = selectedBaby && user.baby && user.baby[selectedBaby] 
    ? user.baby[selectedBaby].responses || {} 
    : {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Responses</Text>
        <TouchableOpacity onPress={() => setIsAddingResponse(!isAddingResponse)}>
          <FontAwesome name={isAddingResponse ? 'times' : 'plus'} size={24} color="#9BCE22" />
        </TouchableOpacity>
      </View>

      {isAddingResponse && (
        <View style={styles.addResponseForm}>
          <Text style={styles.formTitle}>Add New Response</Text>
          <TextInput
            style={styles.input}
            placeholder="Response Name (e.g. Lullaby)"
            value={newResponseName}
            onChangeText={setNewResponseName}
          />
          <TextInput
            style={styles.input}
            placeholder="YouTube URL"
            value={newResponseUrl}
            onChangeText={setNewResponseUrl}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddResponse}>
            <Text style={styles.buttonText}>Add Response</Text>
          </TouchableOpacity>
        </View>
      )}

      {Object.keys(babyResponses).length > 0 ? (
        <View style={styles.responsesList}>
          {Object.entries(babyResponses).map(([name, url]) => (
            <View key={name} style={styles.responseItem}>
              <View style={styles.responseHeader}>
                <Text style={styles.responseName}>{name}</Text>
                <View style={styles.responseActions}>
                  <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => {
                      if (playingResponse === name) {
                        setPlayingResponse(null);
                      } else {
                        setPlayingResponse(name);
                        handlePlayResponse(url as string);
                      }
                    }}
                  >
                    <FontAwesome 
                      name={playingResponse === name ? 'pause' : 'play'} 
                      size={20} 
                      color="#9BCE22" 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => handleRemoveResponse(name)}
                  >
                    <FontAwesome name="trash" size={20} color="#FF4444" />
                  </TouchableOpacity>
                </View>
              </View>
              
              {playingResponse === name && (
                <View style={styles.videoContainer}>
                  <WebView
                    style={styles.video}
                    source={{ uri: url as string }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No responses added yet.</Text>
          <Text style={styles.emptySubtext}>
            Add responses to play for your baby when they need comfort.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addResponseForm: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#9BCE22',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  responsesList: {
    marginTop: 10,
  },
  responseItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  responseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  responseActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
  videoContainer: {
    height: 200,
    marginTop: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 