import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type NotificationItemProps = {
  text: string;
  time: string;
  icon?: keyof typeof FontAwesome.glyphMap;
};

export function NotificationItem({ text, time, icon = 'bell' }: NotificationItemProps) {
  return (
    <View style={styles.container}>
      <FontAwesome name={icon} size={20} color="#666" />
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
}); 