export type Order = {
  TrackingNumber: string;
  ConsigneeAddress: string;
  ConsigneeName: string;
  ConsigneeNumber: string;
  ConsigneeCity: string;
  ConsigneeProvince: string;
  ConsigneePostalCode: string;
  ConsigneeCountry: string;
  PaymentType: string;
  Weight: number;
  Height: number;
  Width: number;
  Length: number;
};

export type OrderRequest = {
  consigneeName: string;
  consigneeAddress: string;
  consigneeCity: string;
  consigneeCountry: string;
  consigneePostalCode: string;
  consigneeProvince: string;
  consigneeNumber: string;
  height: number;
  weight: number;
  length: number;
  width: number;
  paymentType: string;
};

export type OrderResponse = {
  data: Array<Order> | null;
};

export type OrderError = {
  msg: string;
};
