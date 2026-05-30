import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const clientColors = {
  background: '#FBF9F8',
  border: '#E8DAD4',
  card: '#FFFFFF',
  muted: '#6D5B55',
  primary: '#FF6B35',
  primaryDark: '#AB3500',
  surface: '#F0EDEA',
  text: '#1B1C1C',
};

export const DOUALA_REGION = {
  latitude: 4.0511,
  longitude: 9.7679,
  latitudeDelta: 0.07,
  longitudeDelta: 0.07,
};

export const ClientHeader = ({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) => (
  <View style={clientStyles.header}>
    {onBack ? (
      <TouchableOpacity activeOpacity={0.82} onPress={onBack} style={clientStyles.backButton}>
        <Text style={clientStyles.backText}>Retour</Text>
      </TouchableOpacity>
    ) : null}
    <View style={clientStyles.headerCopy}>
      <Text style={clientStyles.title}>{title}</Text>
      {subtitle ? <Text style={clientStyles.subtitle}>{subtitle}</Text> : null}
    </View>
  </View>
);

export const clientStyles = StyleSheet.create({
  backButton: {
    backgroundColor: '#FFF0EA',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backText: {
    color: '#AB3500',
    fontSize: 12,
    fontWeight: '900',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderBottomColor: '#E8DAD4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  headerCopy: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    color: '#6D5B55',
    fontSize: 13,
    marginTop: 3,
  },
  title: {
    color: '#FF6B35',
    fontSize: 22,
    fontWeight: '900',
  },
});
