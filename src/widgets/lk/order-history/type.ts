export interface IOrdersResponse {
  orders: IOrderItem[];
}

export interface IOrderItem {
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
  plates: IPlateItem[];
  price: string;
  salePrice: string;
  status: string;
}

export interface IPlateItem {
  count: string;
  id: string;
  mass: string;
  name: string;
  price: string;
  thumbnailPicture: string;
}
