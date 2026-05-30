import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClientHeader, clientColors, clientStyles } from '../Client/ClientShared';

const hospitals = [
  { name: 'Hopital Laquintinie', area: 'Akwa, Douala', eta: '18 min', type: 'Urgences 24h' },
  { name: 'General Hospital Douala', area: 'Ngodi Bakoko', eta: '24 min', type: 'Centre specialise' },
  { name: 'Hopital Gyneco-Obstetrique', area: 'Yassa', eta: '31 min', type: 'Maternite' },
  { name: 'Clinique Bonapriso', area: 'Bonapriso', eta: '15 min', type: 'Clinique privee' },
];

const HospitalListScreen = ({ navigation }: any) => (
  <View style={styles.screen}>
    <ClientHeader
      subtitle="Choisis un centre proche et commande un trajet."
      title="Hopitaux proches"
    />
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {hospitals.map(item => (
        <View key={item.name} style={styles.hospitalCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>H</Text>
          </View>
          <View style={styles.copy}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.area}>{item.area}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <View style={styles.side}>
            <Text style={styles.eta}>{item.eta}</Text>
            <TouchableOpacity
              activeOpacity={0.86}
              onPress={() => navigation.navigate('Booking')}
              style={styles.goButton}>
              <Text style={styles.goText}>Aller</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  area: {
    color: clientColors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#FFF0EA',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  badgeText: {
    color: clientColors.primaryDark,
    fontSize: 18,
    fontWeight: '900',
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  copy: {
    flex: 1,
  },
  eta: {
    color: clientColors.text,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'right',
  },
  goButton: {
    backgroundColor: clientColors.primary,
    borderRadius: 999,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  goText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  hospitalCard: {
    ...clientStyles.card,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  name: {
    color: clientColors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  screen: {
    backgroundColor: clientColors.background,
    flex: 1,
  },
  side: {
    alignItems: 'flex-end',
  },
  type: {
    color: clientColors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 6,
  },
});

export default HospitalListScreen;
