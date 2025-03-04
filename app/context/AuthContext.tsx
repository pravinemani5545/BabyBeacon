import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// API base URL - replace with your actual API URL
const API_BASE_URL = 'http://localhost:5005';

type User = {
  username: string;
  name: string;
  email: string;
  phone_number: string;
  device_id: string;
  scanning_baby: string;
  baby: Record<string, {
    age: string;
    responses: Record<string, string>;
    rides: any[];
  }>;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  updateUserField: (field: string, value: any) => Promise<boolean>;
  addBaby: (babyName: string, babyAge: string) => Promise<boolean>;
  addBabyResponses: (babyName: string, responses: Record<string, string>) => Promise<boolean>;
  removeBabyResponses: (babyName: string, responseNames: string[]) => Promise<boolean>;
  startScan: () => Promise<boolean>;
  stopScan: () => Promise<boolean>;
  getScanStatus: () => Promise<any>;
  sendResponse: (youtubeUrl: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app start
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        const userData = data.user_data;
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    router.replace('/login');
  };

  const signup = async (userData: any) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data.status === 'success';
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const updateUserField = async (field: string, value: any) => {
    if (!user) return false;
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/update_user_field`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          field_name: field,
          new_value: value
        }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        // Update local user data
        const updatedUser = { ...user };
        
        // Handle nested fields (e.g., "baby.BabyName.age")
        if (field.includes('.')) {
          const parts = field.split('.');
          let current: any = updatedUser;
          
          for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
          }
          
          current[parts[parts.length - 1]] = value;
        } else {
          // Simple field update
          (updatedUser as any)[field] = value;
        }
        
        setUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update field error:', error);
      return false;
    }
  };

  const addBaby = async (babyName: string, babyAge: string) => {
    if (!user) return false;
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/add_baby`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          baby_name: babyName,
          baby_age: babyAge
        }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        // Update local user data
        const updatedUser = { ...user };
        if (!updatedUser.baby) updatedUser.baby = {};
        
        updatedUser.baby[babyName] = {
          age: babyAge,
          responses: {},
          rides: []
        };
        
        updatedUser.scanning_baby = babyName;
        
        setUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Add baby error:', error);
      return false;
    }
  };

  const addBabyResponses = async (babyName: string, responses: Record<string, string>) => {
    if (!user) return false;
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/add_baby_responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          baby_name: babyName,
          responses
        }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        // Update local user data
        const updatedUser = { ...user };
        
        if (updatedUser.baby && updatedUser.baby[babyName]) {
          updatedUser.baby[babyName].responses = {
            ...updatedUser.baby[babyName].responses,
            ...responses
          };
          
          setUser(updatedUser);
          await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Add responses error:', error);
      return false;
    }
  };

  const removeBabyResponses = async (babyName: string, responseNames: string[]) => {
    if (!user) return false;
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${API_BASE_URL}/remove_baby_responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          baby_name: babyName,
          response_names: responseNames
        }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        // Update local user data
        const updatedUser = { ...user };
        
        if (updatedUser.baby && updatedUser.baby[babyName] && updatedUser.baby[babyName].responses) {
          responseNames.forEach(name => {
            delete updatedUser.baby[babyName].responses[name];
          });
          
          setUser(updatedUser);
          await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Remove responses error:', error);
      return false;
    }
  };

  const startScan = async () => {
    if (!user || !user.device_id) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/start_scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: user.device_id
        }),
      });

      const data = await response.json();
      return data.status === 'success';
    } catch (error) {
      console.error('Start scan error:', error);
      return false;
    }
  };

  const stopScan = async () => {
    if (!user || !user.device_id) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/stop_scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: user.device_id
        }),
      });

      const data = await response.json();
      return data.status === 'success';
    } catch (error) {
      console.error('Stop scan error:', error);
      return false;
    }
  };

  const getScanStatus = async () => {
    if (!user || !user.device_id) return null;
    
    try {
      const response = await fetch(`${API_BASE_URL}/get_scan_status?device_id=${user.device_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data.status === 'success' ? data.data : null;
    } catch (error) {
      console.error('Get scan status error:', error);
      return null;
    }
  };

  const sendResponse = async (youtubeUrl: string) => {
    if (!user || !user.device_id) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/send_response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: user.device_id,
          youtube_url: youtubeUrl
        }),
      });

      const data = await response.json();
      return data.status === 'success';
    } catch (error) {
      console.error('Send response error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      signup,
      updateUserField,
      addBaby,
      addBabyResponses,
      removeBabyResponses,
      startScan,
      stopScan,
      getScanStatus,
      sendResponse
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 