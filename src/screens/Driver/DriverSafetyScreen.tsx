import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DriverPage, driverColors, sharedStyles } from './DriverShared';

const safetyItems = [
  'Partager ma position avec le support',
  'Contacter le support urgence',
  'Signaler un passager',
  'Consignes transport medical',
];

const DriverSafetyScreen = () => (
  <DriverPage
    subtitle="Outils de securite et assistance pendant les courses."
    title="Securite">
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>Bouton d'urgence</Text>
        <Text style={styles.alertText}>
          Utilise cette page si une course devient dangereuse ou si le patient a besoin
          d'une aide immediate.
        </Text>
      </View>

      {safetyItems.map(item => (
        <TouchableOpacity activeOpacity={0.84} key={item} style={styles.itemRow}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.chevron}>Voir</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </DriverPage>
);

const styles = StyleSheet.create({
  alertCard: {
    backgroundColor: '#FFE7DF',
    borderColor: '#FFB59D',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  alertText: {
    color: '#6B3A23',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  alertTitle: {
    color: driverColors.primaryDark,
    fontSize: 18,
    fontWeight: '900',
  },
  chevron: {
    color: driverColors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  content: {
    padding: 18,
  },
  itemRow: {
    ...sharedStyles.card,
    ...sharedStyles.row,
    marginBottom: 10,
  },
  itemText: {
    color: driverColors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default DriverSafetyScreen;
