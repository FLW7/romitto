import { type ILocation } from '@/shared/type/map';

export interface IGetSuggestsResponse {
  provider: string;
  predictions: IPredictionItem[];
}

export interface IPredictionItem {
  place_id: string;
  structured_formatting: IStructuredFormatting;
}

export interface IStructuredFormatting {
  main_text: string;
  secondary_text: string;
}

export interface IGetPlaceByIDResponse {
  status: string;
  result: {
    address_components: IAddressComponents[];
    formatted_address: string;
    geometry: { location: ILocation };
    secondary_text: string;
  };
}

export interface IGetPlaceByLocResponse {
  status: string;
  results: Array<{
    address_components: IAddressComponents[];
    formatted_address: string;
    geometry: { location: ILocation };
    secondary_text: string;
  }>;
}

export interface IAddressComponents {
  long_name: string;
  short_name: string;
  types: [TAddressComponents];
}

type TAddressComponents = 'country' | 'locality' | 'route' | 'street_number';

export interface IGetOrganisationByCoordinatesResponse {
  polygons: IPolygonItem[];
  success: boolean;
  text: string;
  id: number;
  id_org: string;
}

export interface IPolygonItem {
  organisationID: string;
  organisation_address: string | null;
  organisation_name: string | null;
  polygonID: string;
}

export interface IAddAddressRequest {
  Lattitude: string;
  Longitude: string;
  Country: string;
  City: string;
  Street: string;
  IsPrivateHouse: 0 | 1;
  HouseNumber: string;
  Apt: string;
  Entreance: string;
  Floor: string;
  DoorNumber: string;
  Commentory: string;
  PolygonID: number;
  OrganisationID: number;
}
