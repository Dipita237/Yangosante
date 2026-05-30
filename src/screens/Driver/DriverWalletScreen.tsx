import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  DriverBottomNav,
  DriverPage,
  driverColors,
  sharedStyles,
} from './DriverShared';

const transactions = [
  { label: 'Course Bonamoussadi', date: 'Aujourd hui, 09:40', amount: '+2.500 XAF' },
  { label: 'Course Akwa', date: 'Hier, 18:12', amount: '+3.200 XAF' },
  { label: 'Retrait Mobile Money', date: '26 mai', amount: '-20.000 XAF' },
];

const DriverWalletScreen = ({ navigation }: any) => (
  <DriverPage
    subtitle="Solde chauffeur, retraits et derniers mouvements."
    title="Wallet">
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Solde disponible</Text>
        <Text style={styles.balanceAmount}>42.300 XAF</Text>
        <Text style={styles.balanceMeta}>Prochain paiement automatique vendredi</Text>
      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.withdrawButton}>
        <Text style={styles.withdrawText}>Demander un retrait</Text>
      </TouchableOpacity>

      <View style={styles.methodCard}>
        <View>
          <Text style={styles.methodTitle}>Compte de retrait</Text>
          <Text style={styles.methodMeta}>Mobile Money - +237 6XX XXX XXX</Text>
        </View>
        <Text style={styles.changeText}>Changer</Text>
      </View>

      <Text style={styles.sectionTitle}>Transactions</Text>
      {transactions.map(item => (
        <View key={`${item.label}-${item.date}`} style={styles.transactionRow}>
          <View>
            <Text style={styles.transactionTitle}>{item.label}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              item.amount.startsWith('-') && styles.transactionAmountDebit,
            ]}>
            {item.amount}
          </Text>
        </View>
      ))}
    </ScrollView>
    <DriverBottomNav active="DriverWallet" navigation={navigation} />
  </DriverPage>
);

const styles = StyleSheet.create({
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    marginTop: 10,
  },
  balanceCard: {
    backgroundColor: '#2D2A29',
    borderRadius: 18,
    padding: 20,
  },
  balanceLabel: {
    color: '#FFB59D',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  balanceMeta: {
    color: '#F3F0F0',
    fontSize: 14,
    marginTop: 8,
  },
  changeText: {
    color: driverColors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  content: {
    padding: 18,
    paddingBottom: 112,
  },
  methodCard: {
    ...sharedStyles.card,
    ...sharedStyles.row,
    marginTop: 14,
  },
  methodMeta: {
    color: driverColors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  methodTitle: {
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
  transactionAmount: {
    color: driverColors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
  transactionAmountDebit: {
    color: driverColors.muted,
  },
  transactionDate: {
    color: driverColors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  transactionRow: {
    ...sharedStyles.card,
    ...sharedStyles.row,
    marginTop: 10,
  },
  transactionTitle: {
    color: driverColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  withdrawButton: {
    alignItems: 'center',
    backgroundColor: driverColors.primary,
    borderRadius: 14,
    marginTop: 14,
    paddingVertical: 16,
  },
  withdrawText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default DriverWalletScreen;
