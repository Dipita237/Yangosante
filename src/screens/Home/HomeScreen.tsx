import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OsmMap from '../../components/OsmMap';
import { clientColors, DOUALA_REGION } from '../Client/ClientShared';

const suggestions = [
  { name: 'Taxi medical', eta: '4 min', price: '2.500 XAF', tag: 'Plus rapide' },
  { name: 'Ambulance simple', eta: '7 min', price: '4.500 XAF', tag: 'Urgence' },
  { name: 'Confort sante', eta: '6 min', price: '3.200 XAF', tag: 'Climatise' },
];

const HomeScreen = ({ navigation }: any) => (
  <View style={styles.screen}>
    <OsmMap
      center={DOUALA_REGION}
      markers={[
        {
          coordinate: DOUALA_REGION,
          key: 'user',
          node: <View style={styles.userMarker} />,
        },
        {
          coordinate: { latitude: 4.064, longitude: 9.752 },
          key: 'driver',
          node: (
            <View style={styles.carMarker}>
              <Text style={styles.carMarkerText}>CAR</Text>
            </View>
          ),
        },
        {
          coordinate: { latitude: 4.036, longitude: 9.781 },
          key: 'ambulance',
          node: (
            <View style={styles.carMarkerMuted}>
              <Text style={styles.carMarkerText}>AMB</Text>
            </View>
          ),
        },
      ]}
      style={StyleSheet.absoluteFill}
      zoom={13}
    />

    <View style={styles.header}>
      <Text style={styles.brand}>YangoSante</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>CL</Text>
      </View>
    </View>

    <View style={styles.searchCard}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Booking')}
        style={styles.searchInput}>
        <Text style={styles.searchIcon}>⌕</Text>
        <Text style={styles.searchText}>Ou allez-vous ?</Text>
      </TouchableOpacity>
      <View style={styles.chips}>
        {['Maison', 'Travail', 'Hopital proche'].map(item => (
          <TouchableOpacity key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    <View style={styles.osmAttribution}>
      <Text style={styles.osmAttributionText}>OpenStreetMap</Text>
    </View>

    <View style={styles.bottomSheet}>
      <View style={styles.handle} />
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>Suggestions</Text>
        <Text style={styles.sheetAction}>Voir tout</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {suggestions.map(item => (
          <TouchableOpacity
            activeOpacity={0.88}
            key={item.name}
            onPress={() => navigation.navigate('Booking')}
            style={styles.suggestionRow}>
            <View style={styles.vehicleIcon}>
              <Text style={styles.vehicleIconText}>+</Text>
            </View>
            <View style={styles.suggestionCopy}>
              <View style={styles.suggestionTitleRow}>
                <Text style={styles.suggestionName}>{item.name}</Text>
                <Text style={styles.tag}>{item.tag}</Text>
              </View>
              <Text style={styles.suggestionMeta}>{item.eta} - arrivee rapide</Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Booking')}
        style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Commander maintenant</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: '#FFF0EA',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  avatarText: {
    color: clientColors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    bottom: 0,
    left: 0,
    maxHeight: 368,
    padding: 18,
    paddingBottom: 84,
    position: 'absolute',
    right: 0,
  },
  brand: {
    color: clientColors.primary,
    fontSize: 23,
    fontWeight: '900',
  },
  carMarker: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: clientColors.primary,
    borderRadius: 13,
    borderWidth: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  carMarkerMuted: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#875138',
    borderRadius: 13,
    borderWidth: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  carMarkerText: {
    color: clientColors.text,
    fontSize: 9,
    fontWeight: '900',
  },
  chip: {
    backgroundColor: '#FFF0EA',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: clientColors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#E1D2CC',
    borderRadius: 999,
    height: 4,
    marginBottom: 14,
    width: 42,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    right: 16,
    top: 44,
  },
  osmAttribution: {
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
    borderRadius: 8,
    bottom: 378,
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
  price: {
    color: clientColors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: clientColors.primary,
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  screen: {
    backgroundColor: clientColors.background,
    flex: 1,
  },
  searchCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderColor: clientColors.border,
    borderRadius: 18,
    borderWidth: 1,
    left: 16,
    padding: 14,
    position: 'absolute',
    right: 16,
    top: 110,
  },
  searchIcon: {
    color: clientColors.primary,
    fontSize: 21,
    fontWeight: '900',
  },
  searchInput: {
    alignItems: 'center',
    backgroundColor: clientColors.surface,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  searchText: {
    color: clientColors.muted,
    fontSize: 16,
    fontWeight: '800',
  },
  sheetAction: {
    color: clientColors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  sheetHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sheetTitle: {
    color: clientColors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  suggestionCopy: {
    flex: 1,
  },
  suggestionMeta: {
    color: clientColors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  suggestionName: {
    color: clientColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  suggestionRow: {
    alignItems: 'center',
    backgroundColor: clientColors.background,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    padding: 12,
  },
  suggestionTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  tag: {
    backgroundColor: '#FFF0EA',
    borderRadius: 5,
    color: clientColors.primaryDark,
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 5,
    paddingVertical: 3,
    textTransform: 'uppercase',
  },
  userMarker: {
    backgroundColor: clientColors.primary,
    borderColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 3,
    height: 22,
    width: 22,
  },
  vehicleIcon: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    width: 54,
  },
  vehicleIconText: {
    color: clientColors.primary,
    fontSize: 26,
    fontWeight: '900',
  },
});

export default HomeScreen;
