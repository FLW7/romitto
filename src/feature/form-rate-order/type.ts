export type IRateOrderRequest = FormData;
// export interface IRateOrderRequest {
//   Stars: string;
//   Options: string;
//   OrderID: string;
//   Comment: string;
//   Images1?: string;
//   Images2?: string;
//   Images3?: string;
// }

export interface IGetRateOptions {
  ID: string;
  IsPositive: '0' | '1';
  OptionText: string;
}
