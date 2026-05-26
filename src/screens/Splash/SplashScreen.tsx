import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth().currentUser;
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚑 YangoSanté</Text>
      <Text style={styles.subtitle}>Transport médical d'urgence</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E63946' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#fff', marginTop: 8 },
});

export default SplashScreen;
