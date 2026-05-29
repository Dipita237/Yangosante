import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function BookingScreen({ navigation }: any) {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!pickup || !destination) {
      Alert.alert('Erreur', 'Veuillez remplir le départ et la destination.');
      return;
    }

    setLoading(true);
    try {
      const currentUser = auth().currentUser;
      
      const newRide = await firestore().collection('rides').add({
        clientId: currentUser?.uid || 'anonymous',
        clientName: currentUser?.displayName || 'Client YangoSanté',
        pickup: pickup,
        destination: destination,
        status: 'en_attente',
        driverId: null,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Succès', 'Recherche de chauffeur en cours...');
      navigation.navigate('Tracking', { rideId: newRide.id });
    } catch (error) {
      Alert.alert('Erreur Firebase', 'Impossible de créer la course.');
    } {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commander un transport médical</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Lieu de prise en charge (ex: Melen)" 
        value={pickup}
        onChangeText={setPickup}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Hôpital de destination (ex: CHU)" 
        value={destination}
        onChangeText={setDestination}
      />

      <TouchableOpacity style={styles.button} onPress={handleBooking} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Connexion...' : 'Demander une ambulance'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#E53935' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#E53935', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
