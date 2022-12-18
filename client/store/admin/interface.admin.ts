import { IPhone, IPersonalData, IAddress } from './../user/interface.user';

//---Users-----
export interface IUsers {
  _id: string;
  email: string;
  isAdmin: boolean;
  phone: IPhone;
  personalData: IPersonalData;
  address: IAddress;
  createdAt: string;
  updatedAt: string;
}
export interface IUsersForAdmin {
  users: { users: IUsers[]; quantity: number };
}

//---Reviews-----
export interface IReviewsForAdmin {
  _id: string;
  userId: IUsers;
  productId?: string;
  store?: string;
  name: string;
  response: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IGeneralReviewsForAdmin {
  reviewsForAdmin: { allReviews: IReviewsForAdmin[]; quantity: number };
}

export interface IAdminInitialState {
  usersForAdmin: IUsersForAdmin;
  generalReviewsForAdmin: IGeneralReviewsForAdmin;
}
