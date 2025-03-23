export interface AddressData {
  blockNumber: string;
  streetName: string;
  buildingName: string;
  fullAddress: string;
  postalCode: string;
}

export interface OneMapResult {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export interface OneMapResponse {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: OneMapResult[];
}
