import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type DriverRouteName =
  | 'DriverHome'
  | 'DriverEarnings'
  | 'DriverWallet'
  | 'DriverProfile';

export const driverColors = {
  background: '#FBF9F8',
  card: '#FFFFFF',
  muted: '#6D5B55',
  primary: '#FF6B35',
  primaryDark: '#AB3500',
  surface: '#F0EDEA',
  text: '#1B1C1C',
  border: '#E8DAD4',
};

export const DriverPage = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <View style={sharedStyles.page}>
    <View style={sharedStyles.header}>
      <View>
        <Text style={sharedStyles.title}>{title}</Text>
        {subtitle ? <Text style={sharedStyles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
    {children}
  </View>
);

export const DriverBottomNav = ({
  active,
  navigation,
}: {
  active: DriverRouteName;
  navigation: any;
}) => {
  const tabs: { route: DriverRouteName; label: string; icon: string }[] = [
    { route: 'DriverHome', label: 'Accueil', icon: 'CAR' },
    { route: 'DriverEarnings', label: 'Revenus', icon: 'XAF' },
    { route: 'DriverWallet', label: 'Wallet', icon: 'PAY' },
    { route: 'DriverProfile', label: 'Profil', icon: 'ME' },
  ];

  return (
    <View style={sharedStyles.bottomTabs}>
      {tabs.map(tab => {
        const selected = tab.route === active;

        return (
          <TouchableOpacity
            activeOpacity={0.85}
            key={tab.route}
            onPress={() => navigation.navigate(tab.route)}
            style={[sharedStyles.tabButton, selected && sharedStyles.tabButtonActive]}>
            <Text style={[sharedStyles.tabIcon, selected && sharedStyles.tabTextActive]}>
              {tab.icon}
            </Text>
            <Text style={[sharedStyles.tabLabel, selected && sharedStyles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const sharedStyles = StyleSheet.create({
  bottomTabs: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E8DAD4',
    borderTopWidth: 1,
    bottom: 0,
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingBottom: 14,
    paddingHorizontal: 10,
    paddingTop: 10,
    position: 'absolute',
    right: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8DAD4',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  page: {
    backgroundColor: '#FBF9F8',
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    color: '#6D5B55',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: 14,
    minWidth: 68,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tabButtonActive: {
    backgroundColor: '#FF6B35',
  },
  tabIcon: {
    color: '#6D5B55',
    fontSize: 10,
    fontWeight: '900',
  },
  tabLabel: {
    color: '#6D5B55',
    fontSize: 11,
    fontWeight: '900',
    marginTop: 2,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  title: {
    color: '#1B1C1C',
    fontSize: 28,
    fontWeight: '900',
  },
});
