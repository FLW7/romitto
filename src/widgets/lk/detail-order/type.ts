export interface IGetDetailOrderResponse {
  IsDeleted: string;
  bonusesRecieved: string;
  bonusesSpent: string;
  color: string;
  dateCreated: string;
  deliveryAddress: string;
  deliveryType: string;
  isPaid: string;
  orderDate: string;
  orderID: string;
  payType: string;
  plates: IPlatesItem[];
  price: string;
  salePrice: string;
  status: string;
  Rating: {
    Comment: number;
    Options: number;
    Stars: number;
  };
  count: number;
}

export interface IPlatesItem {
  id: string;
  composition: string;
  count: string;
  mass: string;
  name: string;
  price: string;
  thumbnailPicture: string;
}
