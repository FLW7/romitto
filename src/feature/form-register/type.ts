export interface ICreateAccountRequest {
  Web: string;
  Name: string;
  Birthday: string;
  Email: string;
  Phone: string;
  // Gender: 'M' | 'F';
  ReferalCode?: string;
}
