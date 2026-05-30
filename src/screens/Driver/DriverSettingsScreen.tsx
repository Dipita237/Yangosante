import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DriverPage, driverColors, sharedStyles } from './DriverShared';

const DriverSettingsScreen = ({ navigation }: any) => {
  const [autoAccept, setAutoAccept] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [shareLocation, setShareLocation] = useState(true);

  return (
    <DriverPage
      subtitle="Preferences de service, alertes et confidentialite."
      title="Parametres">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courses</Text>
          <SettingSwitch
            label="Acceptation automatique"
            onValueChange={setAutoAccept}
            value={autoAccept}
          />
          <SettingSwitch
            label="Alertes sonores"
            onValueChange={setSoundAlerts}
            value={soundAlerts}
          />
          <SettingSwitch
            label="Partager ma position"
            onValueChange={setShareLocation}
            value={shareLocation}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuText}>Modifier le telephone</Text>
            <Text style={styles.menuAction}>Ouvrir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuText}>Langue de l'application</Text>
            <Text style={styles.menuAction}>Francais</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DriverPage>
  );
};

const SettingSwitch = ({
  label,
  onValueChange,
  value,
}: {
  label: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
}) => (
  <View style={styles.switchRow}>
    <Text style={styles.switchLabel}>{label}</Text>
    <Switch
      onValueChange={onValueChange}
      thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      trackColor={{ false: '#D8CBC5', true: driverColors.primary }}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: driverColors.primary,
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  content: {
    padding: 18,
  },
  menuAction: {
    color: driverColors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  menuRow: {
    ...sharedStyles.row,
    borderTopColor: driverColors.border,
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  menuText: {
    color: driverColors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  section: {
    ...sharedStyles.card,
    marginBottom: 14,
  },
  sectionTitle: {
    color: driverColors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  switchLabel: {
    color: driverColors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
  },
  switchRow: {
    alignItems: 'center',
    borderTopColor: driverColors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
});

export default DriverSettingsScreen;
