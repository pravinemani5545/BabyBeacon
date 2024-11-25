import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>About BabyBeacon</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.description}>
          BabyBeacon is your trusted baby monitoring companion, providing peace of mind through advanced monitoring and soothing features.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
}); 