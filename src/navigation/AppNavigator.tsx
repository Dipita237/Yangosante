import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, View } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// Client Screens
import HomeScreen from '../screens/Home/HomeScreen';
import HospitalListScreen from '../screens/Hospitals/HospitalListScreen';
import DiagnosisScreen from '../screens/AI/DiagnosisScreen';
import BookingScreen from '../screens/Booking/BookingScreen';
import HistoryScreen from '../screens/History/HistoryScreen';

// Driver Screen
import DriverScreen from '../screens/Driver/DriverScreen';
import TrackingScreen from '../screens/Tracking/TrackingScreen';

// Admin Screen
import AdminDashboard from '../screens/Admin/AdminDashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs for CLIENT users
const ClientTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Hospitals" component={HospitalListScreen} />
    <Tab.Screen name="Diagnosis" component={DiagnosisScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [user, setUser] = useState(null);
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            <Stack.Screen name="Tracking" component={TrackingScreen} />
          </>
        ) : role === 'admin' ? (
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        ) : (
          <>
            <Stack.Screen name="ClientTabs" component={ClientTabs} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Tracking" component={TrackingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
