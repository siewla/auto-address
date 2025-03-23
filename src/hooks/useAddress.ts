// src/hooks/useAddress.ts
import { useState } from 'react';
import { AddressData } from '../types/types';
import { fetchAddressByPostalCode } from '../services/addressService';

interface UseAddressResult {
  addressData: AddressData | null;
  loading: boolean;
  error: string | null;
  fetchAddress: (postalCode: string) => Promise<boolean>;
  resetAddress: () => void;
}

export const useAddress = (): UseAddressResult => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (postalCode: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAddressByPostalCode(postalCode);

      if (response.success && response.data) {
        setAddressData(response.data);
        return true;
      } else {
        setError(response.error || 'No address found for this postal code');
        setAddressData(null);
        return false;
      }
    } catch (err) {
      setError('Failed to fetch address information');
      setAddressData(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetAddress = (): void => {
    setAddressData(null);
    setError(null);
  };

  return {
    addressData,
    loading,
    error,
    fetchAddress,
    resetAddress
  };
};
