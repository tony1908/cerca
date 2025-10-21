import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';
import { ServiceType } from '@/src/types';

export default function SelectServiceScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  const popularServices = [
    { type: 'CFE' as ServiceType, name: 'CFE - Electricity', icon: 'flash' },
    { type: 'AGUA' as ServiceType, name: 'Water Services', icon: 'water' },
    { type: 'TELMEX' as ServiceType, name: 'Telmex - Internet', icon: 'wifi' },
    { type: 'SKY' as ServiceType, name: 'Sky - TV', icon: 'tv' },
  ];

  const allServices = [
    ...popularServices,
    { type: 'IZZI' as ServiceType, name: 'Izzi - Internet & TV', icon: 'desktop' },
    { type: 'TOTALPLAY' as ServiceType, name: 'Totalplay - Internet', icon: 'globe' },
    { type: 'GAS' as ServiceType, name: 'Gas Natural', icon: 'flame' },
    { type: 'OTHER' as ServiceType, name: 'Other Services', icon: 'apps' },
  ];

  const filteredServices = searchQuery
    ? allServices.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allServices;

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xxxl }}>
          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Select Service
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
            Choose the bill you want to pay
          </Text>
        </View>

        {/* Search Bar */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.uiElements,
          borderRadius: borderRadius.medium,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          marginBottom: spacing.xl,
        }}>
          <Ionicons name="search" size={20} color={colors.secondaryText} style={{ marginRight: spacing.md }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search services..."
            placeholderTextColor={colors.secondaryText}
            style={[
              typography.bodyText,
              {
                color: colors.primaryText,
                flex: 1,
                padding: 0,
              }
            ]}
          />
        </View>

        {/* Popular Services */}
        {!searchQuery && (
          <View style={{ marginBottom: spacing.xl }}>
            <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
              Popular Services
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
              {popularServices.map((service) => (
                <PopularServiceCard
                  key={service.type}
                  service={service}
                  selected={selectedService === service.type}
                  onPress={() => setSelectedService(service.type)}
                  colors={colors}
                />
              ))}
            </View>
          </View>
        )}

        {/* All Services */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
            {searchQuery ? 'Search Results' : 'All Services'}
          </Text>

          {filteredServices.map((service) => (
            <ServiceRow
              key={service.type}
              service={service}
              selected={selectedService === service.type}
              onPress={() => setSelectedService(service.type)}
              colors={colors}
            />
          ))}

          {filteredServices.length === 0 && (
            <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl }}>
              <Ionicons name="search-outline" size={48} color={colors.secondaryText} style={{ marginBottom: spacing.md }} />
              <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
                No services found
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.mainBackground,
        padding: spacing.xl,
        paddingBottom: spacing.xl + 20,
        borderTopWidth: 1,
        borderTopColor: colors.uiElements,
      }}>
        <ActionButton
          title="Continue"
          icon="arrow-forward"
          onPress={() => {}}
          variant="primary"
          disabled={!selectedService}
        />
      </View>
    </SafeAreaView>
  );
}

function PopularServiceCard({ service, selected, onPress, colors }: any) {
  return (
    <TouchableOpacity
      style={[
        shadows.standard,
        {
          width: '48%',
          backgroundColor: selected ? colors.accent : colors.uiElements,
          borderRadius: borderRadius.medium,
          padding: spacing.lg,
          alignItems: 'center',
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: selected ? colors.mainBackground : colors.mainBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
      }}>
        <Ionicons name={service.icon as any} size={24} color={selected ? colors.accent : colors.accent} />
      </View>
      <Text style={[
        typography.subtitle,
        {
          color: selected ? colors.mainBackground : colors.primaryText,
          textAlign: 'center'
        }
      ]}>
        {service.name.split(' - ')[0]}
      </Text>
    </TouchableOpacity>
  );
}

function ServiceRow({ service, selected, onPress, colors }: any) {
  return (
    <TouchableOpacity
      style={[
        shadows.standard,
        {
          backgroundColor: selected ? colors.accent : colors.uiElements,
          borderRadius: borderRadius.medium,
          padding: spacing.lg,
          marginBottom: spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: selected ? colors.mainBackground : colors.mainBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
      }}>
        <Ionicons name={service.icon as any} size={20} color={colors.accent} />
      </View>

      <Text style={[
        typography.bodyText,
        {
          color: selected ? colors.mainBackground : colors.primaryText,
          flex: 1,
        }
      ]}>
        {service.name}
      </Text>

      {selected && (
        <Ionicons name="checkmark-circle" size={24} color={colors.mainBackground} />
      )}
    </TouchableOpacity>
  );
}
