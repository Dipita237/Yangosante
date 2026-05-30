import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OsmMap from '../../components/OsmMap';
import { clientColors, DOUALA_REGION } from './ClientShared';

const ClientSearchingScreen = ({ navigation }: any) => {
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(current => (current >= 92 ? current : current + 8));
    }, 700);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <OsmMap
        center={DOUALA_REGION}
        markers={[
          {
            coordinate: DOUALA_REGION,
            key: 'user',
            node: <View style={styles.userMarker} />,
          },
        ]}
        style={StyleSheet.absoluteFill}
        zoom={13}
      />

      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <ActivityIndicator color={clientColors.primary} size="large" />
          <Text style={styles.title}>Recherche de votre chauffeur...</Text>
          <Text style={styles.subtitle}>
            Nous contactons les chauffeurs les plus proches de vous.
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.meta}>Temps estime: 2 min</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.replace('ClientRide')}
            style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Simuler chauffeur trouve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}>
            <Text style={styles.cancelText}>Annuler la recherche</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    alignItems: 'center',
    backgroundColor: clientColors.surface,
    borderRadius: 14,
    marginTop: 10,
    paddingVertical: 15,
  },
  cancelText: {
    color: '#BA1A1A',
    fontSize: 15,
    fontWeight: '900',
  },
  meta: {
    color: clientColors.muted,
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: clientColors.primary,
    borderRadius: 14,
    marginTop: 18,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  progressFill: {
    backgroundColor: clientColors.primary,
    borderRadius: 999,
    height: 8,
  },
  progressTrack: {
    backgroundColor: '#E8DAD4',
    borderRadius: 999,
    height: 8,
    marginTop: 18,
    overflow: 'hidden',
  },
  screen: {
    backgroundColor: clientColors.background,
    flex: 1,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },
  subtitle: {
    color: clientColors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  title: {
    color: clientColors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 14,
    textAlign: 'center',
  },
  userMarker: {
    backgroundColor: clientColors.primary,
    borderColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 3,
    height: 22,
    width: 22,
  },
});

export default ClientSearchingScreen;
