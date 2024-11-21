import { type IAllowedOrderTimeList } from '@/shared/api/get-min-delivery-price';

export interface GetReservationsDataOrgIDResponse {
  allowedOrderTimeList: IAllowedOrderTimeList;
  canReservate: number;
  Lattitude: string;
  Longitude: string;
  orgAddress: string;
  orgID: string;
  orgName: string;
  phone: string;
}
