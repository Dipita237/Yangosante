import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  DriverBottomNav,
  DriverPage,
  driverColors,
  sharedStyles,
} from './DriverShared';

type DriverProfile = {
  fullName?: string;
  phone?: string;
  city?: string;
  status?: string;
  vehicle?: {
    type?: string;
    brand?: string;
    model?: string;
    color?: string;
    plateNumber?: string;
  };
};

const DriverProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth().currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const [userDoc, profileDoc] = await Promise.all([
          firestore().collection('users').doc(user.uid).get(),
          firestore().collection('driverProfiles').doc(user.uid).get(),
        ]);
        const userData = userDoc.data();
        const profileData = profileDoc.data();

        setProfile({
          fullName: profileData?.fullName || userData?.name,
          phone: profileData?.phone || userData?.phone,
          city: profileData?.city || 'Douala',
          status: profileData?.status || userData?.driverStatus || 'pending_review',
          vehicle: profileData?.vehicle,
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const initials =
    profile?.fullName
      ?.split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'YS';

  return (
    <DriverPage
      subtitle="Compte, documents, vehicule et preferences chauffeur."
      title="Profil">
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={driverColors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHero}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.name}>{profile?.fullName || 'Chauffeur YangoSante'}</Text>
            <Text style={styles.meta}>
              {profile?.city || 'Douala'} - {profile?.status === 'approved' ? 'Valide' : 'En verification'}
            </Text>
          </View>

          <View style={styles.vehicleCard}>
            <View>
              <Text style={styles.vehicleTitle}>
                {profile?.vehicle?.brand || 'Vehicule'} {profile?.vehicle?.model || ''}
              </Text>
              <Text style={styles.vehicleMeta}>
                {profile?.vehicle?.color || 'Couleur'} -{' '}
                {profile?.vehicle?.plateNumber || 'Immatriculation'}
              </Text>
            </View>
            <Text style={styles.vehicleType}>{profile?.vehicle?.type || 'Taxi medical'}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.86}
            onPress={() => navigation.navigate('DriverDocuments')}
            style={styles.menuRow}>
            <Text style={styles.menuText}>Documents du chauffeur</Text>
            <Text style={styles.menuAction}>Ouvrir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={() => navigation.navigate('DriverHistory')}
            style={styles.menuRow}>
            <Text style={styles.menuText}>Historique des courses</Text>
            <Text style={styles.menuAction}>Ouvrir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={() => navigation.navigate('DriverSafety')}
            style={styles.menuRow}>
            <Text style={styles.menuText}>Securite et support</Text>
            <Text style={styles.menuAction}>Ouvrir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.86}
            onPress={() => navigation.navigate('DriverSettings')}
            style={styles.menuRow}>
            <Text style={styles.menuText}>Parametres chauffeur</Text>
            <Text style={styles.menuAction}>Ouvrir</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <DriverBottomNav active="DriverProfile" navigation={navigation} />
    </DriverPage>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: driverColors.primary,
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
  },
  content: {
    padding: 18,
    paddingBottom: 112,
  },
  loader: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  menuAction: {
    color: driverColors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  menuRow: {
    ...sharedStyles.card,
    ...sharedStyles.row,
    marginTop: 10,
  },
  menuText: {
    color: driverColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  meta: {
    color: driverColors.muted,
    fontSize: 14,
    marginTop: 6,
  },
  name: {
    color: driverColors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 12,
  },
  profileHero: {
    ...sharedStyles.card,
    alignItems: 'center',
  },
  vehicleCard: {
    ...sharedStyles.card,
    marginTop: 14,
  },
  vehicleMeta: {
    color: driverColors.muted,
    fontSize: 14,
    marginTop: 4,
  },
  vehicleTitle: {
    color: driverColors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  vehicleType: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0EA',
    borderRadius: 999,
    color: driverColors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
});

export default DriverProfileScreen;
