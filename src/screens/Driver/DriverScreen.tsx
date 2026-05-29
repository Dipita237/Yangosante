import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function DriverScreen() {
  const [rides, setRides] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('rides')
      .where('status', '==', 'en_attente')
      .onSnapshot(querySnapshot => {
        const jobs: any[] = [];
        querySnapshot.forEach(documentSnapshot => {
          jobs.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setRides(jobs);
      });

    return () => unsubscribe();
  }, []);

  const acceptRide = async (rideId: string) => {
    const currentUser = auth().currentUser;
    try {
      await firestore().collection('rides').doc(rideId).update({
        status: 'accepte',
        driverId: currentUser?.uid || 'chauffeur_demo'
      });
      Alert.alert('Course Acceptée', 'Vous pouvez vous rendre chez le patient.');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'accepter cette course.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demandes d'urgence disponibles</Text>
      {rides.length === 0 ? (
        <Text style={styles.noRides}>Aucune urgence pour le moment. Restez vigilant.</Text>
      ) : (
        <FlatList
          data={rides}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}><Text style={{fontWeight: 'bold'}}>Patient :</Text> {item.clientName}</Text>
              <Text style={styles.cardText}><Text style={{fontWeight: 'bold'}}>Départ :</Text> {item.pickup}</Text>
              <Text style={styles.cardText}><Text style={{fontWeight: 'bold'}}>Destination :</Text> {item.destination}</Text>
              <TouchableOpacity style={styles.btnAccept} onPress={() => acceptRide(item.key)}>
                <Text style={styles.btnText}>Accepter la course</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  noRides: { textAlign: 'center', marginTop: 40, color: '#666', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
  cardText: { fontSize: 16, marginBottom: 5 },
  btnAccept: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
