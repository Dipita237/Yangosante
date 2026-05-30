import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OsmMap from '../../components/OsmMap';

const DRIVER_POSITION = {
  latitude: 4.0511,
  longitude: 9.7679,
};

const PICKUP_POSITION = {
  latitude: 4.0662,
  longitude: 9.7387,
};

const DROPOFF_POSITION = {
  latitude: 4.0417,
  longitude: 9.7043,
};

const routeCoordinates = [DRIVER_POSITION, PICKUP_POSITION, DROPOFF_POSITION];

const TrackingScreen = ({ navigation }: any) => {
  const [tripStarted, setTripStarted] = useState(false);

  return (
    <View style={styles.screen}>
      <OsmMap
        center={{
          latitude: 4.0529,
          longitude: 9.7389,
        }}
        markers={[
          {
            coordinate: DRIVER_POSITION,
            key: 'driver',
            node: <View style={styles.driverMarker} />,
          },
          {
            coordinate: PICKUP_POSITION,
            key: 'pickup',
            node: <View style={styles.pickupMarker} />,
          },
          {
            coordinate: DROPOFF_POSITION,
            key: 'dropoff',
            node: <View style={styles.dropoffMarker} />,
          },
        ]}
        route={routeCoordinates}
        style={StyleSheet.absoluteFill}
        zoom={13}
      />

      <View style={styles.topCard}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        <View style={styles.directionCopy}>
          <Text style={styles.directionDistance}>400 m</Text>
          <Text style={styles.directionText}>
            Continue vers le point de depart a Bonamoussadi
          </Text>
        </View>
        <View style={styles.timePill}>
          <Text style={styles.timeValue}>12</Text>
          <Text style={styles.timeLabel}>min</Text>
        </View>
      </View>

      <View style={styles.osmAttribution}>
        <Text style={styles.osmAttributionText}>OpenStreetMap</Text>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <View style={styles.clientRow}>
          <View style={styles.clientAvatar}>
            <Text style={styles.clientAvatarText}>AM</Text>
          </View>
          <View style={styles.clientCopy}>
            <Text style={styles.clientName}>Amine</Text>
            <Text style={styles.clientMeta}>Paiement cash - note 4.9</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>Appel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.routeCard}>
          <View style={styles.routePoint}>
            <View style={styles.pickupDot} />
            <View>
              <Text style={styles.routeLabel}>Depart</Text>
              <Text style={styles.routeText}>Bonamoussadi, carrefour Maetur</Text>
            </View>
          </View>
          <View style={styles.routeDivider} />
          <View style={styles.routePoint}>
            <View style={styles.dropoffDot} />
            <View>
              <Text style={styles.routeLabel}>Destination</Text>
              <Text style={styles.routeText}>Hopital Laquintinie, Akwa</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => setTripStarted(current => !current)}
            style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {tripStarted ? 'Course active' : 'Demarrer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#1B1C1C',
    fontSize: 12,
    fontWeight: '900',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    bottom: 0,
    elevation: 12,
    left: 0,
    padding: 18,
    paddingBottom: 26,
    position: 'absolute',
    right: 0,
  },
  callButton: {
    backgroundColor: '#FFF0EA',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  callButtonText: {
    color: '#AB3500',
    fontSize: 12,
    fontWeight: '900',
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: '#F0EDEA',
    borderRadius: 14,
    flex: 1,
    paddingVertical: 15,
  },
  cancelButtonText: {
    color: '#6D5B55',
    fontSize: 15,
    fontWeight: '900',
  },
  clientAvatar: {
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  clientAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  clientCopy: {
    flex: 1,
  },
  clientMeta: {
    color: '#6D5B55',
    fontSize: 13,
    marginTop: 3,
  },
  clientName: {
    color: '#1B1C1C',
    fontSize: 18,
    fontWeight: '900',
  },
  clientRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  directionCopy: {
    flex: 1,
  },
  directionDistance: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
  },
  directionText: {
    color: '#E7E1DF',
    fontSize: 13,
    marginTop: 2,
  },
  driverMarker: {
    backgroundColor: '#FF6B35',
    borderColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 3,
    height: 22,
    width: 22,
  },
  dropoffDot: {
    backgroundColor: '#875138',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  dropoffMarker: {
    backgroundColor: '#875138',
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    height: 20,
    width: 20,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#E1D2CC',
    borderRadius: 999,
    height: 4,
    marginBottom: 16,
    width: 42,
  },
  osmAttribution: {
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
    borderRadius: 8,
    bottom: 268,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
  },
  osmAttributionText: {
    color: '#4F4A47',
    fontSize: 11,
    fontWeight: '700',
  },
  pickupDot: {
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  pickupMarker: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6B35',
    borderRadius: 10,
    borderWidth: 4,
    height: 20,
    width: 20,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    flex: 1,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  routeCard: {
    backgroundColor: '#FBF9F8',
    borderRadius: 16,
    marginBottom: 16,
    padding: 14,
  },
  routeDivider: {
    backgroundColor: '#E4D5CF',
    height: 1,
    marginLeft: 24,
    marginVertical: 12,
  },
  routeLabel: {
    color: '#6D5B55',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  routePoint: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  routeText: {
    color: '#1B1C1C',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 3,
  },
  screen: {
    backgroundColor: '#FBF9F8',
    flex: 1,
  },
  timeLabel: {
    color: '#E7E1DF',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  timePill: {
    alignItems: 'center',
  },
  timeValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  topCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(45, 42, 41, 0.94)',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 12,
    left: 16,
    padding: 12,
    position: 'absolute',
    right: 16,
    top: 46,
  },
});

export default TrackingScreen;
