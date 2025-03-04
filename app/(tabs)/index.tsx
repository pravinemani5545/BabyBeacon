import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, startScan, stopScan, getScanStatus } = useAuth();
  const [deviceStatus, setDeviceStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkDeviceStatus();
  }, []);

  const checkDeviceStatus = async () => {
    setRefreshing(true);
    const status = await getScanStatus();
    if (status) {
      setDeviceStatus(status.status);
    }
    setRefreshing(false);
  };

  const handleStartScan = async () => {
    setIsLoading(true);
    const success = await startScan();
    if (success) {
      setDeviceStatus('scanning');
    }
    setIsLoading(false);
  };

  const handleStopScan = async () => {
    setIsLoading(true);
    const success = await stopScan();
    if (success) {
      setDeviceStatus('idle');
    }
    setIsLoading(false);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={checkDeviceStatus}
          colors={['#9BCE22']}
        />
      }
    >
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Device Status</Text>
        <View style={styles.statusContent}>
          {refreshing ? (
            <ActivityIndicator size="small" color="#9BCE22" />
          ) : (
            <>
              <FontAwesome 
                name={deviceStatus === 'scanning' ? 'play-circle' : 'pause-circle'} 
                size={32} 
                color={deviceStatus === 'scanning' ? '#9BCE22' : '#FF4444'} 
              />
              <Text style={styles.statusText}>
                {deviceStatus === 'scanning' ? 'Scanning' : deviceStatus === 'idle' ? 'Idle' : 'Unknown'}
              </Text>
            </>
          )}
        </View>
        <TouchableOpacity style={styles.refreshButton} onPress={checkDeviceStatus}>
          <FontAwesome name="refresh" size={16} color="#666" />
          <Text style={styles.refreshText}>Refresh Status</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainer}>
        <Text style={styles.sectionTitle}>Device Controls</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.controlButton, styles.startButton]} 
            onPress={handleStartScan}
            disabled={isLoading || deviceStatus === 'scanning'}
          >
            {isLoading && deviceStatus !== 'scanning' ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <FontAwesome name="play" size={20} color="white" />
                <Text style={styles.buttonText}>Start Scan</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, styles.stopButton]} 
            onPress={handleStopScan}
            disabled={isLoading || deviceStatus !== 'scanning'}
          >
            {isLoading && deviceStatus === 'scanning' ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <FontAwesome name="stop" size={20} color="white" />
                <Text style={styles.buttonText}>Stop Scan</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionText}>1. Make sure your device is connected to power</Text>
        <Text style={styles.instructionText}>2. Place the device near your baby's crib</Text>
        <Text style={styles.instructionText}>3. Press "Start Scan" to begin monitoring</Text>
        <Text style={styles.instructionText}>4. Use the "Responses" tab to play sounds when needed</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 10,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  controlsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#9BCE22',
  },
  stopButton: {
    backgroundColor: '#FF4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  instructionsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
}); 