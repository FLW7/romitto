export interface IProfileResponse {
  Bulkprices: string;
  bonusScore: string;
  brands: [];
  dateOfBirth: string;
  email: string;
  id: string;
  isShowStorieOnStart: string;
  lastAddressID: string;
  lastAddressName: string | null;
  lastAddressOrgID: string | null;
  lastAddressType: string | null;
  lastCityName: string | null;
  name: string;
  notifications: [];
  phone: string;
  storieID: string;
  storiesSeen: [];
  error?: boolean;
}
