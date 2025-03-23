// src/services/addressService.ts
import axios from 'axios';
import { OneMapResponse, AddressData } from '../types/types';

const ONEMAP_API_BASE_URL = 'https://www.onemap.gov.sg/api/common/elastic/search';

export const fetchAddressByPostalCode = async (postalCode: string): Promise<{
  success: boolean;
  data?: AddressData;
  error?: string;
}> => {
  try {
    const response = await axios.get<OneMapResponse>(
      `${ONEMAP_API_BASE_URL}?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y`
    );

    if (response.data.found > 0 && response.data.results.length > 0) {
      const result = response.data.results[0];

      return {
        success: true,
        data: {
          blockNumber: result.BLK_NO,
          streetName: result.ROAD_NAME,
          buildingName: result.BUILDING,
          fullAddress: result.ADDRESS,
          postalCode: result.POSTAL
        }
      };
    } else {
      return {
        success: false,
        error: 'No address found for this postal code'
      };
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return {
      success: false,
      error: 'Failed to fetch address information'
    };
  }
};
