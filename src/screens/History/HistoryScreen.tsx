import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClientHeader, clientColors, clientStyles } from '../Client/ClientShared';

const rides = [
  { date: 'Aujourd hui', route: 'Bonamoussadi vers Laquintinie', status: 'Terminee', price: '2.500 XAF' },
  { date: 'Hier', route: 'Akwa vers Bonapriso', status: 'Terminee', price: '3.200 XAF' },
  { date: '24 mai', route: 'Makepe vers General Hospital', status: 'Annulee', price: '0 XAF' },
  { date: '22 mai', route: 'Deido vers Bonanjo', status: 'Terminee', price: '2.000 XAF' },
];

const HistoryScreen = () => (
  <View style={styles.screen}>
    <ClientHeader subtitle="Tes courses recentes et depenses." title="Historique" />
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Courses</Text>
          <Text style={styles.summaryValue}>12</Text>
        </View>
        <View style={styles.summaryCardPrimary}>
          <Text style={styles.summaryLabelLight}>Total</Text>
          <Text style={styles.summaryValueLight}>45.500 XAF</Text>
        </View>
      </View>

      {rides.map(item => (
        <TouchableOpacity activeOpacity={0.86} key={`${item.date}-${item.route}`} style={styles.rideCard}>
          <View>
            <Text style={styles.rideDate}>{item.date}</Text>
            <Text style={styles.rideRoute}>{item.route}</Text>
            <Text
              style={[
                styles.rideStatus,
                item.status === 'Annulee' && styles.rideStatusCancelled,
              ]}>
              {item.status}
            </Text>
          </View>
          <Text style={styles.ridePrice}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  rideCard: {
    ...clientStyles.card,
    ...clientStyles.row,
    marginBottom: 10,
  },
  rideDate: {
    color: clientColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  ridePrice: {
    color: clientColors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
  rideRoute: {
    color: clientColors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  rideStatus: {
    color: clientColors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 6,
  },
  rideStatusCancelled: {
    color: '#BA1A1A',
  },
  screen: {
    backgroundColor: clientColors.background,
    flex: 1,
  },
  summaryCard: {
    ...clientStyles.card,
    flex: 1,
  },
  summaryCardPrimary: {
    backgroundColor: clientColors.primary,
    borderRadius: 16,
    flex: 1,
    padding: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryLabel: {
    color: clientColors.muted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  summaryLabelLight: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    opacity: 0.86,
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: clientColors.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 8,
  },
  summaryValueLight: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
    marginTop: 8,
  },
});

export default HistoryScreen;
