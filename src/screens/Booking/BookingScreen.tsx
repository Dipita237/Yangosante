import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ClientHeader, clientColors, clientStyles } from '../Client/ClientShared';

const rideOptions = [
  { key: 'eco', name: 'Taxi medical', eta: '4 min', price: '2.500 XAF', detail: 'Rapide et economique' },
  { key: 'comfort', name: 'Confort sante', eta: '6 min', price: '3.200 XAF', detail: 'Vehicule climatise' },
  { key: 'ambulance', name: 'Ambulance simple', eta: '8 min', price: '4.500 XAF', detail: 'Pour urgence medicale' },
  { key: 'vip', name: 'Assistance premium', eta: '10 min', price: '6.000 XAF', detail: 'Confort et priorite' },
];

const BookingScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState('comfort');

  return (
    <View style={styles.screen}>
      <ClientHeader
        onBack={() => navigation.goBack()}
        subtitle="Choisis le trajet et le type de vehicule."
        title="Commander une course"
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.routeCard}>
          <Text style={styles.label}>Depart</Text>
          <TextInput
            placeholder="Ma position actuelle"
            placeholderTextColor={clientColors.muted}
            style={styles.input}
            value="Ma position actuelle"
          />
          <Text style={styles.label}>Destination</Text>
          <TextInput
            placeholder="Hopital, quartier, adresse..."
            placeholderTextColor={clientColors.muted}
            style={styles.input}
            value="Hopital Laquintinie, Akwa"
          />
        </View>

        <Text style={styles.sectionTitle}>Choisissez votre trajet</Text>
        {rideOptions.map(option => {
          const active = selected === option.key;

          return (
            <TouchableOpacity
              activeOpacity={0.88}
              key={option.key}
              onPress={() => setSelected(option.key)}
              style={[styles.optionCard, active && styles.optionCardActive]}>
              <View style={styles.optionIcon}>
                <Text style={styles.optionIconText}>+</Text>
              </View>
              <View style={styles.optionCopy}>
                <Text style={styles.optionName}>{option.name}</Text>
                <Text style={styles.optionDetail}>
                  {option.eta} - {option.detail}
                </Text>
              </View>
              <Text style={styles.optionPrice}>{option.price}</Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Paiement</Text>
          <Text style={styles.paymentMeta}>Cash au chauffeur</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ClientSearching')}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Commander maintenant</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  input: {
    backgroundColor: clientColors.background,
    borderColor: clientColors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: clientColors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  label: {
    color: clientColors.muted,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  optionCard: {
    ...clientStyles.card,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  optionCardActive: {
    borderColor: clientColors.primary,
    borderWidth: 2,
  },
  optionCopy: {
    flex: 1,
  },
  optionDetail: {
    color: clientColors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  optionIcon: {
    alignItems: 'center',
    backgroundColor: '#FFF0EA',
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    width: 54,
  },
  optionIconText: {
    color: clientColors.primary,
    fontSize: 26,
    fontWeight: '900',
  },
  optionName: {
    color: clientColors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  optionPrice: {
    color: clientColors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  paymentCard: {
    ...clientStyles.card,
    marginTop: 8,
  },
  paymentMeta: {
    color: clientColors.muted,
    fontSize: 14,
    marginTop: 3,
  },
  paymentTitle: {
    color: clientColors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: clientColors.primary,
    borderRadius: 14,
    marginTop: 16,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  routeCard: {
    ...clientStyles.card,
    marginBottom: 20,
  },
  screen: {
    backgroundColor: clientColors.background,
    flex: 1,
  },
  sectionTitle: {
    color: clientColors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },
});

export default BookingScreen;
