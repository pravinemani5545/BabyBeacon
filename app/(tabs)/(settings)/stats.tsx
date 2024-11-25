import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sleep Patterns</Text>
        <View style={styles.chartPlaceholder}>
          <FontAwesome name="bar-chart" size={40} color="#666" />
          <Text style={styles.placeholderText}>Sleep Duration Chart</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crying Frequency</Text>
        <View style={styles.chartPlaceholder}>
          <FontAwesome name="line-chart" size={40} color="#666" />
          <Text style={styles.placeholderText}>Crying Frequency Chart</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Summary</Text>
        <View style={styles.summaryGrid}>
          <SummaryCard
            icon="moon-o"
            title="Avg. Sleep"
            value="6.5 hrs"
          />
          <SummaryCard
            icon="volume-up"
            title="Crying/Day"
            value="3 times"
          />
          <SummaryCard
            icon="clock-o"
            title="Deep Sleep"
            value="4.2 hrs"
          />
          <SummaryCard
            icon="heartbeat"
            title="Activity"
            value="Normal"
          />
        </View>
      </View>
    </ScrollView>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <View style={styles.summaryCard}>
      <FontAwesome name={icon} size={24} color="#9BCE22" />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#666',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
}); 