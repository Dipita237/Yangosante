import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DriverPage, driverColors, sharedStyles } from './DriverShared';

const rides = [
  { client: 'Amine', route: 'Bonamoussadi vers Laquintinie', price: '2.500 XAF' },
  { client: 'Mireille', route: 'Akwa vers Bonapriso', price: '3.200 XAF' },
  { client: 'Cedric', route: 'Makepe vers General Hospital', price: '2.800 XAF' },
  { client: 'Nadine', route: 'Deido vers Bonanjo', price: '2.000 XAF' },
];

const DriverHistoryScreen = () => (
  <DriverPage
    subtitle="Courses passees, clients transportes et montants recus."
    title="Historique">
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {rides.map(item => (
        <View key={`${item.client}-${item.route}`} style={styles.rideRow}>
          <View>
            <Text style={styles.client}>{item.client}</Text>
            <Text style={styles.route}>{item.route}</Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      ))}
    </ScrollView>
  </DriverPage>
);

const styles = StyleSheet.create({
  client: {
    color: driverColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  content: {
    padding: 18,
  },
  price: {
    color: driverColors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
  rideRow: {
    ...sharedStyles.card,
    ...sharedStyles.row,
    marginBottom: 10,
  },
  route: {
    color: driverColors.muted,
    fontSize: 13,
    marginTop: 4,
  },
});

export default DriverHistoryScreen;
