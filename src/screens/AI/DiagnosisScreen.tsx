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

const symptoms = ['Fievre', 'Douleur thoracique', 'Malaise', 'Accident', 'Grossesse'];

const DiagnosisScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState('Malaise');

  return (
    <View style={styles.screen}>
      <ClientHeader
        subtitle="Pre-orientation simple avant de commander un transport."
        title="Assistant sante"
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Important</Text>
          <Text style={styles.warningText}>
            Cet assistant ne remplace pas un medecin. En cas d'urgence vitale,
            appelle directement les secours.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Symptome principal</Text>
        <View style={styles.chips}>
          {symptoms.map(item => (
            <TouchableOpacity
              activeOpacity={0.84}
              key={item}
              onPress={() => setSelected(item)}
              style={[styles.chip, selected === item && styles.chipActive]}>
              <Text style={[styles.chipText, selected === item && styles.chipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Details</Text>
        <TextInput
          multiline
          placeholder="Explique rapidement la situation..."
          placeholderTextColor={clientColors.muted}
          style={styles.textArea}
        />

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Suggestion</Text>
          <Text style={styles.resultTitle}>Transport medical recommande</Text>
          <Text style={styles.resultText}>
            Pour "{selected}", choisis un taxi medical ou une ambulance simple selon
            la gravite et la mobilite du patient.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Booking')}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Commander un transport</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#FFFFFF',
    borderColor: clientColors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: clientColors.primary,
    borderColor: clientColors.primary,
  },
  chipText: {
    color: clientColors.muted,
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  content: {
    padding: 18,
    paddingBottom: 34,
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
  resultCard: {
    ...clientStyles.card,
    marginTop: 16,
  },
  resultLabel: {
    color: clientColors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  resultText: {
    color: clientColors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  resultTitle: {
    color: clientColors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 6,
  },
  screen: {
    backgroundColor: clientColors.background,
    flex: 1,
  },
  sectionTitle: {
    color: clientColors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
    marginTop: 18,
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderColor: clientColors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: clientColors.text,
    minHeight: 118,
    padding: 14,
    textAlignVertical: 'top',
  },
  warningCard: {
    backgroundColor: '#FFE7DF',
    borderColor: '#FFB59D',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  warningText: {
    color: '#6B3A23',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  warningTitle: {
    color: clientColors.primaryDark,
    fontSize: 18,
    fontWeight: '900',
  },
});

export default DiagnosisScreen;
