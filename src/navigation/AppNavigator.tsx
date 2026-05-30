import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// Client Screens
import HomeScreen from '../screens/Home/HomeScreen';
import HospitalListScreen from '../screens/Hospitals/HospitalListScreen';
import DiagnosisScreen from '../screens/AI/DiagnosisScreen';
import BookingScreen from '../screens/Booking/BookingScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import ClientRideScreen from '../screens/Client/ClientRideScreen';
import ClientSearchingScreen from '../screens/Client/ClientSearchingScreen';

// Driver Screen
import DriverScreen from '../screens/Driver/DriverScreen';
import DriverDocumentsScreen from '../screens/Driver/DriverDocumentsScreen';
import DriverEarningsScreen from '../screens/Driver/DriverEarningsScreen';
import DriverHistoryScreen from '../screens/Driver/DriverHistoryScreen';
import DriverProfileScreen from '../screens/Driver/DriverProfileScreen';
import DriverRideRequestScreen from '../screens/Driver/DriverRideRequestScreen';
import DriverSafetyScreen from '../screens/Driver/DriverSafetyScreen';
import DriverSettingsScreen from '../screens/Driver/DriverSettingsScreen';
import DriverWalletScreen from '../screens/Driver/DriverWalletScreen';
import TrackingScreen from '../screens/Tracking/TrackingScreen';

// Admin Screen
import AdminDashboard from '../screens/Admin/AdminDashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs for CLIENT users
const ClientTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FF6B35',
      tabBarInactiveTintColor: '#6D5B55',
      tabBarLabelStyle: styles.tabLabel,
      tabBarStyle: styles.tabBar,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarLabel: 'Accueil' }}
    />
    <Tab.Screen
      name="Hospitals"
      component={HospitalListScreen}
      options={{ tabBarLabel: 'Hopitaux' }}
    />
    <Tab.Screen
      name="Diagnosis"
      component={DiagnosisScreen}
      options={{ tabBarLabel: 'Sante' }}
    />
    <Tab.Screen
      name="History"
      component={HistoryScreen}
      options={{ tabBarLabel: 'Historique' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const userDoc = await firestore()
          .collection('users')
          .doc(firebaseUser.uid)
          .get();
        setRole(userDoc.data()?.role || 'client');
        setUser(firebaseUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : role === 'driver' ? (
          <>
            <Stack.Screen name="DriverHome" component={DriverScreen} />
            <Stack.Screen name="DriverEarnings" component={DriverEarningsScreen} />
            <Stack.Screen name="DriverWallet" component={DriverWalletScreen} />
            <Stack.Screen name="DriverProfile" component={DriverProfileScreen} />
            <Stack.Screen name="DriverDocuments" component={DriverDocumentsScreen} />
            <Stack.Screen name="DriverHistory" component={DriverHistoryScreen} />
            <Stack.Screen name="DriverSafety" component={DriverSafetyScreen} />
            <Stack.Screen name="DriverSettings" component={DriverSettingsScreen} />
            <Stack.Screen name="DriverRideRequest" component={DriverRideRequestScreen} />
            <Stack.Screen name="Tracking" component={TrackingScreen} />
          </>
        ) : role === 'admin' ? (
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        ) : (
          <>
            <Stack.Screen name="ClientTabs" component={ClientTabs} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="ClientSearching" component={ClientSearchingScreen} />
            <Stack.Screen name="ClientRide" component={ClientRideScreen} />
            <Stack.Screen name="Tracking" component={TrackingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E8DAD4',
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '800',
  },
});

export default AppNavigator;
