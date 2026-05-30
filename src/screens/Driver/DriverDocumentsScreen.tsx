import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { DriverPage, driverColors, sharedStyles } from './DriverShared';

const documents = [
  {
    key: 'identityCard',
    name: "Carte d'identite",
    status: 'En verification',
    detail: 'Photo lisible recue',
  },
  {
    key: 'driverLicense',
    name: 'Permis de conduire',
    status: 'En verification',
    detail: 'Expiration a confirmer',
  },
  {
    key: 'vehicleRegistration',
    name: 'Carte grise',
    status: 'En verification',
    detail: 'Vehicule associe',
  },
  {
    key: 'insurance',
    name: 'Assurance',
    status: 'A renouveler',
    detail: 'Ajoute la nouvelle attestation',
  },
  {
    key: 'technicalInspection',
    name: 'Visite technique',
    status: 'En verification',
    detail: 'Controle technique recent',
  },
];

const DriverDocumentsScreen = ({ navigation }: any) => {
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [localFiles, setLocalFiles] = useState<Record<string, Asset>>({});

  const pickAndUploadDocument = async (documentKey: string) => {
    const user = auth().currentUser;

    if (!user) {
      Alert.alert('Session', 'Connecte-toi avant de modifier tes documents.');
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorMessage) {
      Alert.alert('Document', result.errorMessage);
      return;
    }

    const asset = result.assets?.[0];
    if (!asset?.uri) {
      Alert.alert('Document', 'Aucun fichier selectionne.');
      return;
    }

    setUploadingKey(documentKey);
    try {
      const filename = asset.fileName || `${documentKey}.jpg`;

      await firestore()
        .collection('driverProfiles')
        .doc(user.uid)
        .set(
          {
            documents: {
              [documentKey]: {
                name: filename,
                localUri: asset.uri,
                status: 'pending_upload',
                type: asset.type || 'image/jpeg',
                selectedAt: new Date().toISOString(),
              },
            },
            status: 'pending_review',
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );

      setLocalFiles(current => ({ ...current, [documentKey]: asset }));
      Alert.alert('Document envoye', 'La piece a ete ajoutee au dossier chauffeur.');
    } catch {
      Alert.alert('Envoi impossible', 'Verifie ta connexion puis reessaie.');
    } finally {
      setUploadingKey(null);
    }
  };

  return (
    <DriverPage
      subtitle="Controle les pieces envoyees et mets a jour les documents expires."
      title="Documents">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {documents.map(item => (
          <View key={item.name} style={styles.documentRow}>
            <View style={styles.documentBadge}>
              <Text style={styles.documentBadgeText}>
                {localFiles[item.key] ? 'OK' : 'DOC'}
              </Text>
            </View>
            <View style={styles.documentCopy}>
              <Text style={styles.documentTitle}>{item.name}</Text>
              <Text style={styles.documentDetail}>
                {localFiles[item.key]?.fileName || item.detail}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.86}
              disabled={uploadingKey === item.key}
              onPress={() => pickAndUploadDocument(item.key)}
              style={styles.statusPill}>
              {uploadingKey === item.key ? (
                <ActivityIndicator color={driverColors.primaryDark} size="small" />
              ) : (
                <Text style={styles.statusText}>{item.status}</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => pickAndUploadDocument('extraDocument')}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Ajouter un document</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Retour au profil</Text>
        </TouchableOpacity>
      </ScrollView>
    </DriverPage>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  documentBadge: {
    alignItems: 'center',
    backgroundColor: '#FFF0EA',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  documentBadgeText: {
    color: driverColors.primaryDark,
    fontSize: 10,
    fontWeight: '900',
  },
  documentCopy: {
    flex: 1,
  },
  documentDetail: {
    color: driverColors.muted,
    fontSize: 13,
    marginTop: 3,
  },
  documentRow: {
    ...sharedStyles.card,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  documentTitle: {
    color: driverColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: driverColors.primary,
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: driverColors.surface,
    borderRadius: 14,
    marginTop: 10,
    paddingVertical: 15,
  },
  secondaryButtonText: {
    color: driverColors.muted,
    fontSize: 15,
    fontWeight: '900',
  },
  statusPill: {
    backgroundColor: '#FFF0EA',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    color: driverColors.primaryDark,
    fontSize: 10,
    fontWeight: '900',
  },
});

export default DriverDocumentsScreen;
