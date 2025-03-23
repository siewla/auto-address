// src/components/AddressForm.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useAddress } from '../hooks/useAddress';

const AddressForm: React.FC = () => {
  const [postalCode, setPostalCode] = useState<string>('');
  const [blockStreet, setBlockStreet] = useState<string>('');
  const [buildingName, setBuildingName] = useState<string>('');
  const [unitNumber, setUnitNumber] = useState<string>('');

  const { addressData, loading, error, fetchAddress } = useAddress();

  // Validate postal code is 6 digits
  const isValidPostalCode = (code: string): boolean => {
    return /^\d{6}$/.test(code);
  };

  useEffect(() => {
    if (addressData) {
      setBlockStreet(`${addressData.blockNumber} ${addressData.streetName}`);
      if (addressData.buildingName !== 'NIL') {
        setBuildingName(addressData.buildingName);
      } else {
        setBuildingName('')
      }
    }
  }, [addressData]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleFindAddress = async (): Promise<void> => {
    if (!isValidPostalCode(postalCode)) {
      Alert.alert('Error', 'Please enter a valid 6-digit postal code');
      return;
    }

    await fetchAddress(postalCode);
  };

  const handlePostalCodeChange = (text: string): void => {
    // Only allow digits
    const sanitizedText = text.replace(/[^0-9]/g, '');
    setPostalCode(sanitizedText);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 320078"
            value={postalCode}
            onChangeText={handlePostalCodeChange}
            keyboardType="numeric"
            maxLength={6}
          />

          {postalCode.length > 0 && !isValidPostalCode(postalCode) && (
            <Text style={styles.errorText}>
              Please enter a valid 6-digit postal code
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              (!isValidPostalCode(postalCode) || loading) ? styles.buttonDisabled : null
            ]}
            onPress={handleFindAddress}
            disabled={!isValidPostalCode(postalCode) || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Find Address</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Block/Street Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 78 LORONG LIMAU"
            value={blockStreet}
            onChangeText={setBlockStreet}
          />

          <Text style={styles.label}>Building Name</Text>
          <TextInput
            style={styles.input}
            placeholder="If applicable"
            value={buildingName}
            onChangeText={setBuildingName}
          />

          <Text style={styles.label}>Unit Number</Text>
          <TextInput
            style={styles.input}
            placeholder="If applicable"
            value={unitNumber}
            onChangeText={setUnitNumber}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4c3ee6',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#a8a8a8',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  }
});

export default AddressForm;
