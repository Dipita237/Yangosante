import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  DriverBottomNav,
  DriverPage,
  driverColors,
  sharedStyles,
} from './DriverShared';

const days = [
  { day: 'Lundi', rides: 6, amount: '14.250 XAF' },
  { day: 'Mardi', rides: 5, amount: '11.800 XAF' },
  { day: 'Mercredi', rides: 8, amount: '18.900 XAF' },
  { day: 'Jeudi', rides: 7, amount: '16.400 XAF' },
  { day: 'Vendredi', rides: 9, amount: '22.700 XAF' },
];

const DriverEarningsScreen = ({ navigation }: any) => (
  <DriverPage
    subtitle="Suivi des gains, courses terminees et objectifs chauffeur."
    title="Revenus">
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Cette semaine</Text>
        <Text style={styles.total}>86.800 XAF</Text>
        <Text style={styles.heroText}>35 courses terminees - moyenne 4.9</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.smallCard}>
          <Text style={styles.smallLabel}>Aujourd'hui</Text>
          <Text style={styles.smallValue}>12.450</Text>
          <Text style={styles.smallUnit}>XAF</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.smallLabel}>Objectif</Text>
          <Text style={styles.smallValue}>72%</Text>
          <Text style={styles.smallUnit}>atteint</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Details par jour</Text>
      {days.map(item => (
        <View key={item.day} style={styles.listRow}>
          <View>
            <Text style={styles.rowTitle}>{item.day}</Text>
            <Text style={styles.rowMeta}>{item.rides} courses</Text>
          </View>
          <Text style={styles.rowAmount}>{item.amount}</Text>
        </View>
      ))}
    </ScrollView>
    <DriverBottomNav active="DriverEarnings" navigation={navigation} />
  </DriverPage>
);

const styles = StyleSheet.create({
  content: {
    padding: 18,
    paddingBottom: 112,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  heroCard: {
    backgroundColor: '#2D2A29',
    borderRadius: 18,
    padding: 20,
  },
  heroText: {
    color: '#F3F0F0',
    fontSize: 14,
    marginTop: 8,
  },
  kicker: {
    color: '#FFB59D',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  listRow: {
    ...sharedStyles.card,
    ...sharedStyles.row,
    marginTop: 10,
  },
  rowAmount: {
    color: driverColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  rowMeta: {
    color: driverColors.muted,
    fontSize: 13,
    marginTop: 3,
  },
  rowTitle: {
    color: driverColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  sectionTitle: {
    color: driverColors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 22,
  },
  smallCard: {
    ...sharedStyles.card,
    flex: 1,
  },
  smallLabel: {
    color: driverColors.muted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  smallUnit: {
    color: driverColors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  smallValue: {
    color: driverColors.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 8,
  },
  total: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 8,
  },
});

export default DriverEarningsScreen;
