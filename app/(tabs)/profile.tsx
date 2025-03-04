import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout, updateUserField, addBaby, startScan, stopScan } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newBabyName, setNewBabyName] = useState('');
  const [newBabyAge, setNewBabyAge] = useState('');
  const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phone_number);
      setSelectedBaby(user.scanning_baby);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    let success = true;
    
    if (name !== user.name) {
      const nameSuccess = await updateUserField('name', name);
      success = success && nameSuccess;
    }
    
    if (email !== user.email) {
      const emailSuccess = await updateUserField('email', email);
      success = success && emailSuccess;
    }
    
    if (phoneNumber !== user.phone_number) {
      const phoneSuccess = await updateUserField('phone_number', phoneNumber);
      success = success && phoneSuccess;
    }
    
    if (success) {
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } else {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleAddBaby = async () => {
    if (!newBabyName || !newBabyAge) {
      Alert.alert('Error', 'Please enter both baby name and age');
      return;
    }
    
    const success = await addBaby(newBabyName, newBabyAge);
    
    if (success) {
      Alert.alert('Success', 'Baby added successfully');
      setNewBabyName('');
      setNewBabyAge('');
    } else {
      Alert.alert('Error', 'Failed to add baby');
    }
  };

  const handleSelectBaby = async (babyName: string) => {
    if (!user) return;
    
    const success = await updateUserField('scanning_baby', babyName);
    
    if (success) {
      setSelectedBaby(babyName);
    } else {
      Alert.alert('Error', 'Failed to select baby');
    }
  };

  const handleStartScan = async () => {
    setIsLoading(true);
    const success = await startScan();
    setIsLoading(false);
    
    if (!success) {
      Alert.alert('Error', 'Failed to start scan');
    }
  };

  const handleStopScan = async () => {
    setIsLoading(true);
    const success = await stopScan();
    setIsLoading(false);
    
    if (!success) {
      Alert.alert('Error', 'Failed to stop scan');
    }
  };

  if (!user) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <FontAwesome name="edit" size={24} color="#9BCE22" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>
        
        {isEditing ? (
          <View style={styles.form}>
            <View style={styles.formField}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Text style={styles.linkText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{user.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{user.phone_number}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Device ID:</Text>
              <Text style={styles.infoValue}>{user.device_id}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Babies</Text>
        </View>
        
        {user.baby && Object.keys(user.baby).length > 0 ? (
          <View style={styles.babiesList}>
            {Object.entries(user.baby).map(([babyName, babyData]) => (
              <TouchableOpacity 
                key={babyName}
                style={[
                  styles.babyItem,
                  selectedBaby === babyName && styles.selectedBaby
                ]}
                onPress={() => handleSelectBaby(babyName)}
              >
                <View>
                  <Text style={styles.babyName}>{babyName}</Text>
                  <Text style={styles.babyAge}>Age: {babyData.age || 'Not specified'}</Text>
                </View>
                {selectedBaby === babyName && (
                  <FontAwesome name="check" size={20} color="#9BCE22" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.message}>No babies added yet.</Text>
        )}
        
        <View style={styles.addBabyForm}>
          <Text style={styles.formTitle}>Add New Baby</Text>
          <View style={styles.formField}>
            <Text style={styles.label}>Baby Name</Text>
            <TextInput
              style={styles.input}
              value={newBabyName}
              onChangeText={setNewBabyName}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Baby Age</Text>
            <TextInput
              style={styles.input}
              value={newBabyAge}
              onChangeText={setNewBabyAge}
              placeholder="e.g., 6 months"
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddBaby}>
            <Text style={styles.buttonText}>Add Baby</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Device Control</Text>
        </View>
        <View style={styles.deviceControls}>
          <TouchableOpacity 
            style={[styles.controlButton, styles.startButton]}
            onPress={handleStartScan}
            disabled={isLoading}
          >
            <FontAwesome name="play" size={20} color="white" />
            <Text style={styles.controlButtonText}>Start Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.controlButton, styles.stopButton]}
            onPress={handleStopScan}
            disabled={isLoading}
          >
            <FontAwesome name="stop" size={20} color="white" />
            <Text style={styles.controlButtonText}>Stop Scan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
  section: {
    marginBottom: 24,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    gap: 12,
  },
  formField: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#9BCE22',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#9BCE22',
    textAlign: 'center',
    marginTop: 10,
  },
  infoContainer: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  babiesList: {
    gap: 8,
  },
  babyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedBaby: {
    borderColor: '#9BCE22',
    borderWidth: 2,
  },
  babyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  babyAge: {
    fontSize: 14,
    color: '#666',
  },
  addBabyForm: {
    marginTop: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#9BCE22',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  deviceControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    gap: 8,
  },
  startButton: {
    backgroundColor: '#9BCE22',
  },
  stopButton: {
    backgroundColor: '#ff4444',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 