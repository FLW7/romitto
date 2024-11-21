import { type IAllowedOrderTimeList } from '@/shared/api/get-min-delivery-price';

export interface GetReservationsDataOrgIDResponse {
  allowedOrderTimeList: IAllowedOrderTimeList;
  canReservate: number;
  orgAddress: string;
  orgID: string;
  orgName: string;
  phone: string;
}
