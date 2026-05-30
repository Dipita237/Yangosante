import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OsmMap from '../../components/OsmMap';
import { driverColors } from './DriverShared';

const DRIVER_POSITION = {
  latitude: 4.0511,
  longitude: 9.7679,
};

const PICKUP_POSITION = {
  latitude: 4.0662,
  longitude: 9.7387,
};

const DriverRideRequestScreen = ({ navigation }: any) => {
  const [secondsLeft, setSecondsLeft] = useState(15);

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigation.goBack();
      return;
    }

    const timer = setTimeout(() => setSecondsLeft(current => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [navigation, secondsLeft]);

  return (
    <View style={styles.screen}>
      <OsmMap
        center={{
          latitude: 4.0585,
          longitude: 9.753,
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
        ]}
        style={StyleSheet.absoluteFill}
        zoom={13}
      />

      <View style={styles.overlay}>
        <View style={styles.requestSheet}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{secondsLeft}</Text>
          </View>
          <Text style={styles.title}>Nouvelle course</Text>
          <Text style={styles.subtitle}>A 500 m de votre position</Text>

          <View style={styles.clientCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AM</Text>
            </View>
            <View style={styles.clientCopy}>
              <Text style={styles.clientLabel}>Passager</Text>
              <Text style={styles.clientName}>Amine</Text>
            </View>
            <Text style={styles.rating}>4.9</Text>
          </View>

          <View style={styles.metrics}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Prix estime</Text>
              <Text style={styles.metricValue}>2.500 XAF</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Temps</Text>
              <Text style={styles.metricValue}>18 min</Text>
            </View>
          </View>

          <View style={styles.routeCard}>
            <View style={styles.routeRow}>
              <View style={styles.pickupDot} />
              <View>
                <Text style={styles.routeLabel}>Depart</Text>
                <Text style={styles.routeText}>Bonamoussadi, carrefour Maetur</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.routeRow}>
              <View style={styles.dropoffDot} />
              <View>
                <Text style={styles.routeLabel}>Destination</Text>
                <Text style={styles.routeText}>Hopital Laquintinie, Akwa</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.replace('Tracking')}
            style={styles.acceptButton}>
            <Text style={styles.acceptText}>Accepter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.goBack()}
            style={styles.declineButton}>
            <Text style={styles.declineText}>Refuser</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  acceptButton: {
    alignItems: 'center',
    backgroundColor: driverColors.primary,
    borderRadius: 14,
    marginTop: 14,
    paddingVertical: 16,
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: driverColors.primary,
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
  clientCard: {
    alignItems: 'center',
    backgroundColor: driverColors.background,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
    padding: 14,
  },
  clientCopy: {
    flex: 1,
  },
  clientLabel: {
    color: driverColors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  clientName: {
    color: driverColors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 2,
  },
  declineButton: {
    alignItems: 'center',
    backgroundColor: driverColors.surface,
    borderRadius: 14,
    marginTop: 10,
    paddingVertical: 15,
  },
  declineText: {
    color: driverColors.muted,
    fontSize: 16,
    fontWeight: '900',
  },
  divider: {
    backgroundColor: driverColors.border,
    height: 1,
    marginLeft: 24,
    marginVertical: 12,
  },
  driverMarker: {
    backgroundColor: driverColors.primary,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 3,
    height: 24,
    width: 24,
  },
  dropoffDot: {
    backgroundColor: '#875138',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  metric: {
    backgroundColor: '#FFFFFF',
    borderColor: driverColors.border,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  metricLabel: {
    color: driverColors.muted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  metricValue: {
    color: driverColors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 8,
  },
  metrics: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  pickupDot: {
    backgroundColor: driverColors.primary,
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  pickupMarker: {
    backgroundColor: '#FFFFFF',
    borderColor: driverColors.primary,
    borderRadius: 11,
    borderWidth: 4,
    height: 22,
    width: 22,
  },
  rating: {
    color: driverColors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  requestSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
  },
  routeCard: {
    backgroundColor: driverColors.background,
    borderRadius: 16,
    marginTop: 12,
    padding: 14,
  },
  routeLabel: {
    color: driverColors.muted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  routeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  routeText: {
    color: driverColors.text,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 3,
  },
  screen: {
    backgroundColor: driverColors.background,
    flex: 1,
  },
  subtitle: {
    color: driverColors.muted,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  timerCircle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF0EA',
    borderColor: driverColors.primary,
    borderRadius: 42,
    borderWidth: 4,
    height: 84,
    justifyContent: 'center',
    marginTop: -48,
    width: 84,
  },
  timerText: {
    color: driverColors.primary,
    fontSize: 26,
    fontWeight: '900',
  },
  title: {
    color: driverColors.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default DriverRideRequestScreen;
