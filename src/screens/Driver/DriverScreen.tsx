import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import OsmMap from '../../components/OsmMap';

type DriverTab = 'home' | 'earnings' | 'wallet' | 'profile';
type DocumentKey =
  | 'identityCard'
  | 'driverLicense'
  | 'vehicleRegistration'
  | 'insurance'
  | 'technicalInspection';

type DriverDocument = {
  key: DocumentKey;
  title: string;
  subtitle: string;
};

type DriverForm = {
  fullName: string;
  phone: string;
  city: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleColor: string;
  plateNumber: string;
};

const INITIAL_REGION = {
  latitude: 4.0511,
  longitude: 9.7679,
  latitudeDelta: 0.055,
  longitudeDelta: 0.055,
};

const DRIVER_DOCUMENTS: DriverDocument[] = [
  {
    key: 'identityCard',
    title: "Carte d'identite",
    subtitle: 'Recto ou photo lisible',
  },
  {
    key: 'driverLicense',
    title: 'Permis de conduire',
    subtitle: 'Permis valide du chauffeur',
  },
  {
    key: 'vehicleRegistration',
    title: 'Carte grise',
    subtitle: 'Document officiel du vehicule',
  },
  {
    key: 'insurance',
    title: 'Assurance',
    subtitle: 'Attestation en cours de validite',
  },
  {
    key: 'technicalInspection',
    title: 'Visite technique',
    subtitle: 'Controle technique recent',
  },
];

const DEFAULT_FORM: DriverForm = {
  fullName: '',
  phone: '',
  city: 'Douala',
  vehicleType: 'Taxi medical',
  vehicleBrand: '',
  vehicleModel: '',
  vehicleColor: '',
  plateNumber: '',
};

const DriverScreen = ({ navigation }: any) => {
  const [tab, setTab] = useState<DriverTab>('home');
  const [online, setOnline] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [driverStatus, setDriverStatus] = useState<string>('draft');
  const [form, setForm] = useState<DriverForm>(DEFAULT_FORM);
  const [documents, setDocuments] = useState<Partial<Record<DocumentKey, Asset>>>({});

  const uploadedCount = useMemo(
    () => DRIVER_DOCUMENTS.filter(document => documents[document.key]).length,
    [documents],
  );

  useEffect(() => {
    const loadDriverProfile = async () => {
      const user = auth().currentUser;

      if (!user) {
        setLoadingProfile(false);
        return;
      }

      try {
        const [userDoc, driverDoc] = await Promise.all([
          firestore().collection('users').doc(user.uid).get(),
          firestore().collection('driverProfiles').doc(user.uid).get(),
        ]);

        const userData = userDoc.data();
        const driverData = driverDoc.data();

        setForm({
          fullName: driverData?.fullName || userData?.name || '',
          phone: driverData?.phone || userData?.phone || '',
          city: driverData?.city || 'Douala',
          vehicleType: driverData?.vehicle?.type || 'Taxi medical',
          vehicleBrand: driverData?.vehicle?.brand || '',
          vehicleModel: driverData?.vehicle?.model || '',
          vehicleColor: driverData?.vehicle?.color || '',
          plateNumber: driverData?.vehicle?.plateNumber || '',
        });
        setDriverStatus(driverData?.status || userData?.driverStatus || 'draft');
      } catch {
        Alert.alert('Erreur', 'Impossible de charger le dossier chauffeur.');
      } finally {
        setLoadingProfile(false);
      }
    };

    loadDriverProfile();
  }, []);

  const updateField = (field: keyof DriverForm, value: string) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const selectDocument = async (documentKey: DocumentKey) => {
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

    setDocuments(current => ({ ...current, [documentKey]: asset }));
  };

  const prepareDocument = (documentKey: DocumentKey, asset: Asset) => {
    if (!asset.uri) {
      return null;
    }

    const filename = asset.fileName || `${documentKey}.jpg`;

    return {
      name: filename,
      localUri: asset.uri,
      status: 'pending_upload',
      type: asset.type || 'image/jpeg',
      selectedAt: new Date().toISOString(),
    };
  };

  const submitDriverProfile = async () => {
    const user = auth().currentUser;

    if (!user) {
      Alert.alert('Session', 'Connecte-toi avant de continuer.');
      return;
    }

    const missingFields = Object.entries(form)
      .filter(([, value]) => !value.trim())
      .map(([key]) => key);

    if (missingFields.length > 0) {
      Alert.alert('Dossier incomplet', 'Remplis toutes les informations chauffeur et vehicule.');
      return;
    }

    const missingDocuments = DRIVER_DOCUMENTS.filter(document => !documents[document.key]);
    if (missingDocuments.length > 0) {
      Alert.alert('Documents requis', 'Ajoute tous les documents demandes avant de soumettre.');
      return;
    }

    setSubmitting(true);
    try {
      const uploadedDocuments = await DRIVER_DOCUMENTS.reduce(
        async (previousPromise, document) => {
          const previous = await previousPromise;
          const asset = documents[document.key];

          if (!asset) {
            return previous;
          }

          const uploaded = prepareDocument(document.key, asset);
          return { ...previous, [document.key]: uploaded };
        },
        Promise.resolve({} as Record<string, unknown>),
      );

      await firestore()
        .collection('driverProfiles')
        .doc(user.uid)
        .set(
          {
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            city: form.city.trim(),
            status: 'pending_review',
            vehicle: {
              type: form.vehicleType.trim(),
              brand: form.vehicleBrand.trim(),
              model: form.vehicleModel.trim(),
              color: form.vehicleColor.trim(),
              plateNumber: form.plateNumber.trim().toUpperCase(),
            },
            documents: uploadedDocuments,
            submittedAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );

      await firestore().collection('users').doc(user.uid).set(
        {
          phone: form.phone.trim(),
          driverStatus: 'pending_review',
          driverProfileSubmitted: true,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      setDriverStatus('pending_review');
      Alert.alert('Dossier envoye', 'Tes informations sont maintenant en verification.');
    } catch {
      Alert.alert('Envoi impossible', 'Verifie ta connexion puis reessaie.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProfile) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="#FF6B35" size="large" />
        <Text style={styles.loaderText}>Chargement du compte chauffeur...</Text>
      </View>
    );
  }

  if (driverStatus === 'draft') {
    return (
      <DriverOnboarding
        documents={documents}
        form={form}
        onPickDocument={selectDocument}
        onSubmit={submitDriverProfile}
        onUpdateField={updateField}
        submitting={submitting}
        uploadedCount={uploadedCount}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <DriverHeader status={driverStatus} />

      {tab === 'home' && (
        <DriverDashboard
          navigation={navigation}
          onToggleOnline={() => setOnline(current => !current)}
          online={online}
        />
      )}
      {tab === 'earnings' && <DriverEarnings />}
      {tab === 'wallet' && <DriverWallet />}
      {tab === 'profile' && <DriverProfile form={form} status={driverStatus} />}

      <DriverBottomTabs
        activeTab={tab}
        onChange={nextTab => {
          if (nextTab === 'home') {
            setTab('home');
            return;
          }

          const routeMap = {
            earnings: 'DriverEarnings',
            wallet: 'DriverWallet',
            profile: 'DriverProfile',
          };

          navigation.navigate(routeMap[nextTab]);
        }}
      />
    </View>
  );
};

const DriverOnboarding = ({
  documents,
  form,
  onPickDocument,
  onSubmit,
  onUpdateField,
  submitting,
  uploadedCount,
}: {
  documents: Partial<Record<DocumentKey, Asset>>;
  form: DriverForm;
  onPickDocument: (documentKey: DocumentKey) => void;
  onSubmit: () => void;
  onUpdateField: (field: keyof DriverForm, value: string) => void;
  submitting: boolean;
  uploadedCount: number;
}) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={styles.onboardingRoot}>
    <ScrollView
      contentContainerStyle={styles.onboardingContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.onboardingHero}>
        <Text style={styles.brand}>YangoSante Drive</Text>
        <Text style={styles.onboardingTitle}>Complete ton dossier chauffeur</Text>
        <Text style={styles.onboardingSubtitle}>
          Ajoute tes informations, ton vehicule et les documents necessaires pour
          commencer a recevoir des courses.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        <DriverInput
          label="Nom complet"
          onChangeText={value => onUpdateField('fullName', value)}
          placeholder="Ex: Jean Talla"
          value={form.fullName}
        />
        <DriverInput
          keyboardType="phone-pad"
          label="Telephone"
          onChangeText={value => onUpdateField('phone', value)}
          placeholder="+237 6XX XXX XXX"
          value={form.phone}
        />
        <DriverInput
          label="Ville"
          onChangeText={value => onUpdateField('city', value)}
          placeholder="Douala"
          value={form.city}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicule</Text>
        <DriverInput
          label="Type de service"
          onChangeText={value => onUpdateField('vehicleType', value)}
          placeholder="Taxi medical, ambulance..."
          value={form.vehicleType}
        />
        <View style={styles.row}>
          <DriverInput
            containerStyle={styles.rowItem}
            label="Marque"
            onChangeText={value => onUpdateField('vehicleBrand', value)}
            placeholder="Toyota"
            value={form.vehicleBrand}
          />
          <DriverInput
            containerStyle={styles.rowItem}
            label="Modele"
            onChangeText={value => onUpdateField('vehicleModel', value)}
            placeholder="Corolla"
            value={form.vehicleModel}
          />
        </View>
        <View style={styles.row}>
          <DriverInput
            containerStyle={styles.rowItem}
            label="Couleur"
            onChangeText={value => onUpdateField('vehicleColor', value)}
            placeholder="Blanc"
            value={form.vehicleColor}
          />
          <DriverInput
            autoCapitalize="characters"
            containerStyle={styles.rowItem}
            label="Immatriculation"
            onChangeText={value => onUpdateField('plateNumber', value)}
            placeholder="LT-000-AA"
            value={form.plateNumber}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <Text style={styles.progressText}>
            {uploadedCount}/{DRIVER_DOCUMENTS.length}
          </Text>
        </View>

        {DRIVER_DOCUMENTS.map(document => (
          <TouchableOpacity
            activeOpacity={0.85}
            key={document.key}
            onPress={() => onPickDocument(document.key)}
            style={[
              styles.documentItem,
              documents[document.key] && styles.documentItemReady,
            ]}>
            <View style={styles.documentBadge}>
              <Text style={styles.documentBadgeText}>
                {documents[document.key] ? 'OK' : 'DOC'}
              </Text>
            </View>
            <View style={styles.documentCopy}>
              <Text style={styles.documentTitle}>{document.title}</Text>
              <Text style={styles.documentSubtitle}>
                {documents[document.key]?.fileName || document.subtitle}
              </Text>
            </View>
            <Text style={styles.documentAction}>
              {documents[document.key] ? 'Changer' : 'Ajouter'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        disabled={submitting}
        onPress={onSubmit}
        style={[styles.primaryButton, submitting && styles.primaryButtonDisabled]}>
        {submitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Soumettre le dossier</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);

const DriverInput = ({
  containerStyle,
  label,
  ...props
}: React.ComponentProps<typeof TextInput> & {
  containerStyle?: object;
  label: string;
}) => (
  <View style={[styles.inputGroup, containerStyle]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      placeholderTextColor="#9A8A84"
      style={styles.input}
      {...props}
    />
  </View>
);

const DriverHeader = ({ status }: { status: string }) => (
  <View style={styles.header}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>YS</Text>
    </View>
    <View style={styles.headerCopy}>
      <Text style={styles.headerTitle}>YangoSante</Text>
      <Text style={styles.headerSubtitle}>Console chauffeur</Text>
    </View>
    <View style={styles.statusBadge}>
      <Text style={styles.statusBadgeText}>
        {status === 'approved' ? 'Valide' : 'Verification'}
      </Text>
    </View>
  </View>
);

const DriverDashboard = ({
  navigation,
  online,
  onToggleOnline,
}: {
  navigation: any;
  online: boolean;
  onToggleOnline: () => void;
}) => (
  <View style={styles.dashboard}>
    <OsmMap
      center={INITIAL_REGION}
      markers={[
        {
          coordinate: INITIAL_REGION,
          key: 'driver',
          node: (
            <View style={styles.driverMarker}>
              <View style={styles.driverMarkerCore} />
            </View>
          ),
        },
      ]}
      style={StyleSheet.absoluteFill}
      zoom={13}
    />

    <View pointerEvents="box-none" style={styles.mapOverlay}>
      <View style={styles.statusToggle}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onToggleOnline}
          style={[styles.toggleButton, !online && styles.toggleButtonActiveMuted]}>
          <Text style={[styles.toggleText, !online && styles.toggleTextActive]}>
            Hors ligne
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onToggleOnline}
          style={[styles.toggleButton, online && styles.toggleButtonActive]}>
          <Text style={[styles.toggleText, online && styles.toggleTextActive]}>
            En ligne
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.metricCard, styles.metricCardWide]}>
          <Text style={styles.metricLabel}>Revenus du jour</Text>
          <Text style={styles.metricValue}>12.450 XAF</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Courses</Text>
          <Text style={styles.metricValue}>14</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Note</Text>
          <Text style={styles.metricValue}>4.92</Text>
        </View>
      </View>

      <View style={styles.spacer} />

      <View style={styles.osmAttribution}>
        <Text style={styles.osmAttributionText}>OpenStreetMap</Text>
      </View>

      <View style={styles.requestCard}>
        <Text style={styles.requestKicker}>Nouvelle course proche</Text>
        <Text style={styles.requestTitle}>Bonamoussadi vers Hopital Laquintinie</Text>
        <View style={styles.requestMetaRow}>
          <Text style={styles.requestMeta}>2.1 km</Text>
          <Text style={styles.requestMeta}>18 min</Text>
          <Text style={styles.requestPrice}>2.500 XAF</Text>
        </View>
        <View style={styles.requestActions}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Refuser</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('DriverRideRequest')}
            style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Voir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const DriverEarnings = () => (
  <ScrollView contentContainerStyle={styles.tabContent}>
    <Text style={styles.pageTitle}>Revenus</Text>
    <View style={styles.largeCard}>
      <Text style={styles.metricLabel}>Cette semaine</Text>
      <Text style={styles.earningsTotal}>86.800 XAF</Text>
      <Text style={styles.mutedText}>34 courses terminees</Text>
    </View>
    {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, index) => (
      <View key={day} style={styles.listRow}>
        <View>
          <Text style={styles.listTitle}>{day}</Text>
          <Text style={styles.mutedText}>{5 + index} courses</Text>
        </View>
        <Text style={styles.listAmount}>{(12400 + index * 1850).toLocaleString('fr-FR')} XAF</Text>
      </View>
    ))}
  </ScrollView>
);

const DriverWallet = () => (
  <ScrollView contentContainerStyle={styles.tabContent}>
    <Text style={styles.pageTitle}>Wallet</Text>
    <View style={styles.largeCardDark}>
      <Text style={styles.walletLabel}>Solde disponible</Text>
      <Text style={styles.walletAmount}>42.300 XAF</Text>
      <Text style={styles.walletText}>Prochain paiement: vendredi</Text>
    </View>
    <TouchableOpacity style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>Demander un retrait</Text>
    </TouchableOpacity>
  </ScrollView>
);

const DriverProfile = ({ form, status }: { form: DriverForm; status: string }) => (
  <ScrollView contentContainerStyle={styles.tabContent}>
    <Text style={styles.pageTitle}>Profil chauffeur</Text>
    <View style={styles.profileHero}>
      <View style={styles.profileAvatar}>
        <Text style={styles.profileAvatarText}>
          {form.fullName
            .split(' ')
            .map(part => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || 'YS'}
        </Text>
      </View>
      <Text style={styles.profileName}>{form.fullName}</Text>
      <Text style={styles.mutedText}>
        {status === 'approved' ? 'Compte valide' : 'Dossier en verification'}
      </Text>
    </View>
    <View style={styles.largeCard}>
      <Text style={styles.vehicleTitle}>
        {form.vehicleBrand} {form.vehicleModel}
      </Text>
      <Text style={styles.mutedText}>
        {form.vehicleColor} - {form.plateNumber.toUpperCase()}
      </Text>
      <Text style={styles.vehiclePill}>{form.vehicleType}</Text>
    </View>
  </ScrollView>
);

const DriverBottomTabs = ({
  activeTab,
  onChange,
}: {
  activeTab: DriverTab;
  onChange: (tab: DriverTab) => void;
}) => {
  const tabs: { key: DriverTab; label: string }[] = [
    { key: 'home', label: 'Accueil' },
    { key: 'earnings', label: 'Revenus' },
    { key: 'wallet', label: 'Wallet' },
    { key: 'profile', label: 'Profil' },
  ];

  return (
    <View style={styles.bottomTabs}>
      {tabs.map(item => {
        const active = item.key === activeTab;

        return (
          <TouchableOpacity
            activeOpacity={0.82}
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[styles.tabButton, active && styles.tabButtonActive]}>
            <Text style={[styles.tabText, active && styles.tabTextActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  acceptButton: {
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    flex: 1,
    paddingVertical: 14,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  bottomTabs: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EADCD6',
    borderTopWidth: 1,
    bottom: 0,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingBottom: 14,
    paddingHorizontal: 12,
    paddingTop: 10,
    position: 'absolute',
    right: 0,
  },
  brand: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  dashboard: {
    flex: 1,
  },
  documentAction: {
    color: '#FF6B35',
    fontSize: 13,
    fontWeight: '800',
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
    color: '#AB3500',
    fontSize: 10,
    fontWeight: '900',
  },
  documentCopy: {
    flex: 1,
  },
  documentItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    padding: 12,
  },
  documentItemReady: {
    borderColor: '#FF6B35',
  },
  documentSubtitle: {
    color: '#7A6B66',
    fontSize: 12,
    marginTop: 3,
  },
  documentTitle: {
    color: '#1B1C1C',
    fontSize: 14,
    fontWeight: '800',
  },
  driverMarker: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.22)',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  driverMarkerCore: {
    backgroundColor: '#FF6B35',
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 3,
    height: 20,
    width: 20,
  },
  earningsTotal: {
    color: '#1B1C1C',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderBottomColor: '#EADCD6',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    left: 0,
    paddingHorizontal: 18,
    paddingVertical: 12,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 5,
  },
  headerCopy: {
    flex: 1,
  },
  headerSubtitle: {
    color: '#7A6B66',
    fontSize: 12,
  },
  headerTitle: {
    color: '#FF6B35',
    fontSize: 19,
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#FBF9F8',
    borderColor: '#E4D5CF',
    borderRadius: 12,
    borderWidth: 1,
    color: '#1B1C1C',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    color: '#443631',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 7,
  },
  largeCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  largeCardDark: {
    backgroundColor: '#2D2A29',
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 16,
    padding: 20,
  },
  listAmount: {
    color: '#1B1C1C',
    fontSize: 15,
    fontWeight: '900',
  },
  listRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 14,
  },
  listTitle: {
    color: '#1B1C1C',
    fontSize: 15,
    fontWeight: '800',
  },
  loader: {
    alignItems: 'center',
    backgroundColor: '#FBF9F8',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  loaderText: {
    color: '#7A6B66',
    marginTop: 14,
  },
  mapOverlay: {
    flex: 1,
    paddingBottom: 94,
    paddingHorizontal: 18,
    paddingTop: 78,
  },
  metricCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(232, 218, 212, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  metricCardWide: {
    flexBasis: '100%',
  },
  metricLabel: {
    color: '#6D5B55',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  metricValue: {
    color: '#1B1C1C',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 6,
  },
  mutedText: {
    color: '#6D5B55',
    fontSize: 14,
    marginTop: 4,
  },
  onboardingContent: {
    padding: 20,
    paddingBottom: 36,
  },
  onboardingHero: {
    paddingTop: 14,
  },
  onboardingRoot: {
    backgroundColor: '#FBF9F8',
    flex: 1,
  },
  onboardingSubtitle: {
    color: '#6D5B55',
    fontSize: 15,
    lineHeight: 22,
  },
  onboardingTitle: {
    color: '#1B1C1C',
    fontSize: 29,
    fontWeight: '900',
    lineHeight: 36,
    marginBottom: 10,
  },
  osmAttribution: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  osmAttributionText: {
    color: '#4F4A47',
    fontSize: 11,
    fontWeight: '700',
  },
  pageTitle: {
    color: '#1B1C1C',
    fontSize: 28,
    fontWeight: '900',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 16,
  },
  primaryButtonDisabled: {
    opacity: 0.62,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  profileAvatar: {
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  profileAvatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  profileHero: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 20,
  },
  profileName: {
    color: '#1B1C1C',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 12,
  },
  progressText: {
    color: '#FF6B35',
    fontSize: 13,
    fontWeight: '900',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 20,
    borderWidth: 1,
    elevation: 8,
    padding: 16,
  },
  requestKicker: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  requestMeta: {
    color: '#6D5B55',
    fontSize: 13,
    fontWeight: '700',
  },
  requestMetaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  requestPrice: {
    color: '#1B1C1C',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 'auto',
  },
  requestTitle: {
    color: '#1B1C1C',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowItem: {
    flex: 1,
  },
  screen: {
    backgroundColor: '#FBF9F8',
    flex: 1,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#F0EDEA',
    borderRadius: 12,
    flex: 1,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: '#6D5B55',
    fontSize: 15,
    fontWeight: '800',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#1B1C1C',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
  },
  spacer: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  statusBadge: {
    backgroundColor: '#FFF0EA',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusBadgeText: {
    color: '#AB3500',
    fontSize: 11,
    fontWeight: '900',
  },
  statusToggle: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 999,
    flexDirection: 'row',
    padding: 5,
  },
  tabButton: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  tabButtonActive: {
    backgroundColor: '#FF6B35',
  },
  tabContent: {
    paddingBottom: 120,
    paddingHorizontal: 18,
    paddingTop: 86,
  },
  tabText: {
    color: '#6D5B55',
    fontSize: 12,
    fontWeight: '800',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  toggleButton: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  toggleButtonActive: {
    backgroundColor: '#FF6B35',
  },
  toggleButtonActiveMuted: {
    backgroundColor: '#875138',
  },
  toggleText: {
    color: '#6D5B55',
    fontSize: 14,
    fontWeight: '900',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  vehiclePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0EA',
    borderRadius: 999,
    color: '#AB3500',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  vehicleTitle: {
    color: '#1B1C1C',
    fontSize: 20,
    fontWeight: '900',
  },
  walletAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 10,
  },
  walletLabel: {
    color: '#FFB59D',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  walletText: {
    color: '#F3F0F0',
    fontSize: 14,
    marginTop: 8,
  },
});

export default DriverScreen;
