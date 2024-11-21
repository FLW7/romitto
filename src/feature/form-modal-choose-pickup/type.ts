export interface IGetOrganisationsResponse {
  data: IGetOrganisationsItem[];
}

export interface IGetOrganisationsItem {
  address: string;
  brandID: string;
  city: string;
  description: string;
  friTime: string;
  id: string;
  isHaveDelivery: string;
  isHaveLocalOrder: string;
  lattitude: string;
  longitude: string;
  markerID: number;
  minPriceForLocalSale: string;
  monTime: string;
  name: string;
  phone: string;
  satTime: string;
  sunTime: string;
  thuTime: string;
  thumbnailPicture: string;
  timetableDescription: string;
  tueTime: string;
  wedTime: string;
}
