export interface ICreateReservationRequest {
  UserID: number;
  Guests: number;
  OrganisationID: number;
  GetLink: number;
  Date: string;
  Comment?: string;
  Phone: string;
  Name: string;
  platform: 1;
}
export interface ICreateReservationResponse {
  link: string;
  reservationID: number;
}
