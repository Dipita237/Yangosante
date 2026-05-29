import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function TrackingScreen({ route }: any) {
  const { rideId } = route.params;
  const [rideStatus, setRideStatus] = useState('En attente de confirmation...');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('rides')
      .doc(rideId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          if (data?.status === 'en_attente') {
            setRideStatus('Recherche d\'un chauffeur disponible...');
          } else if (data?.status === 'accepte') {
            setRideStatus('Chauffeur en route ! Un véhicule médicalisé arrive.');
          }
        }
      });

    return () => unsubscribe();
  }, [rideId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi de votre Ambulance</Text>
      <ActivityIndicator size="large" color="#E53935" style={{ marginVertical: 30 }} />
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{rideStatus}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  statusBox: { padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10, width: '100%' },
  statusText: { fontSize: 18, textAlign: 'center', fontWeight: '500', color: '#E53935' }
});
