export interface IGetMyAddressResponse {
  data: IGetMyAddressItem[];
}

export interface IGetMyAddressItem {
  brandID: string;
  city: string;
  commentory: string;
  country: string;
  doorNumber: string;
  entreance: string;
  floor: string;
  houseNumber: string;
  id: string;
  isPrivateHouse: string;
  lattitude: string;
  longitude: string;
  organisationID: string;
  polygonID: string;
  street: string;
  apt: string | null;
}

export interface IChooseMyAddressRequest {
  LastAddressType: number;
  LastAddressID: number;
  LastAddressOrgID: number;
  LastAddressName: string;
}
