export interface Validate {
  _id?: string;
  name?: string;
  origin?: string;
  destination?: string;
  assignee?: string;
  orderStatus?: string;
  pickupDate?: string | Date | null;
  deliveryDate?: string | Date | null;
}

export interface AuthValidate {
  _id?: string;
  username?: string;
  password?: string;
}
