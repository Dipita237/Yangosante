import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OsmMap from '../../components/OsmMap';
import { clientColors } from './ClientShared';

const pickup = { latitude: 4.0662, longitude: 9.7387 };
const driver = { latitude: 4.0555, longitude: 9.754 };
const destination = { latitude: 4.0417, longitude: 9.7043 };

const ClientRideScreen = ({ navigation }: any) => (
  <View style={styles.screen}>
    <OsmMap
      center={{
        latitude: 4.053,
        longitude: 9.733,
      }}
      markers={[
        { coordinate: pickup, key: 'pickup', node: <View style={styles.pickupMarker} /> },
        { coordinate: driver, key: 'driver', node: <View style={styles.driverMarker} /> },
        {
          coordinate: destination,
          key: 'destination',
          node: <View style={styles.destinationMarker} />,
        },
      ]}
      route={[driver, pickup, destination]}
      style={StyleSheet.absoluteFill}
      zoom={13}
    />

    <View style={styles.topCard}>
      <Text style={styles.topTitle}>Votre chauffeur arrive</Text>
      <Text style={styles.topSubtitle}>Arrivee estimee dans 4 min</Text>
    </View>

    <TouchableOpacity activeOpacity={0.85} style={styles.sosButton}>
      <Text style={styles.sosText}>SOS</Text>
    </TouchableOpacity>

    <View style={styles.sheet}>
      <View style={styles.handle} />
      <View style={styles.driverRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JT</Text>
        </View>
        <View style={styles.driverCopy}>
          <Text style={styles.driverName}>Jean Talla</Text>
          <Text style={styles.driverMeta}>Toyota Corolla blanche - LT-482-AA</Text>
        </View>
        <Text style={styles.rating}>4.9</Text>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.lightButton}>
          <Text style={styles.lightButtonText}>Appeler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightButton}>
          <Text style={styles.lightButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.routeCard}>
        <Text style={styles.routeLabel}>Destination</Text>
        <Text style={styles.routeText}>Hopital Laquintinie, Akwa</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => navigation.navigate('ClientTabs')}
        style={styles.cancelButton}>
        <Text style={styles.cancelText}>Terminer la simulation</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: clientColors.primary,
    borderRadius: 27,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: clientColors.surface,
    borderRadius: 14,
    marginTop: 14,
    paddingVertical: 15,
  },
  cancelText: {
    color: clientColors.muted,
    fontSize: 15,
    fontWeight: '900',
  },
  destinationMarker: {
    backgroundColor: '#875138',
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    height: 20,
    width: 20,
  },
  driverCopy: {
    flex: 1,
  },
  driverMarker: {
    backgroundColor: clientColors.primary,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 3,
    height: 24,
    width: 24,
  },
  driverMeta: {
    color: clientColors.muted,
    fontSize: 13,
    marginTop: 3,
  },
  driverName: {
    color: clientColors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  driverRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#E1D2CC',
    borderRadius: 999,
    height: 4,
    marginBottom: 16,
    width: 42,
  },
  lightButton: {
    alignItems: 'center',
    backgroundColor: '#FFF0EA',
    borderRadius: 14,
    flex: 1,
    paddingVertical: 14,
  },
  lightButtonText: {
    color: clientColors.primaryDark,
    fontSize: 14,
    fontWeight: '900',
  },
  pickupMarker: {
    backgroundColor: '#FFFFFF',
    borderColor: clientColors.primary,
    borderRadius: 10,
    borderWidth: 4,
    height: 20,
    width: 20,
  },
  rating: {
    color: clientColors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  routeCard: {
    backgroundColor: clientColors.background,
    borderRadius: 14,
    marginTop: 14,
    padding: 14,
  },
  routeLabel: {
    color: clientColors.muted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  routeText: {
    color: clientColors.text,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 4,
  },
  screen: {
    backgroundColor: clientColors.background,
    flex: 1,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    bottom: 0,
    left: 0,
    padding: 18,
    paddingBottom: 26,
    position: 'absolute',
    right: 0,
  },
  sosButton: {
    alignItems: 'center',
    backgroundColor: '#BA1A1A',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 18,
    top: 130,
    width: 56,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  topCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 18,
    left: 16,
    padding: 16,
    position: 'absolute',
    right: 16,
    top: 46,
  },
  topSubtitle: {
    color: clientColors.muted,
    fontSize: 14,
    marginTop: 4,
  },
  topTitle: {
    color: clientColors.text,
    fontSize: 21,
    fontWeight: '900',
  },
});

export default ClientRideScreen;
