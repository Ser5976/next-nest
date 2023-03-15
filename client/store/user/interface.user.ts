import { IReviews } from './../../components/page-components/Product-Page/product.service';
import { IProduct } from './../../components/page-components/Home/home.service';

export interface IPersonalData {
  name: string;
  gender: string;
  birthday: string;
}
export interface IPhone {
  phone: string;
}
export interface IAddress {
  city: string;
  street: string;
  house: string;
  flat?: string;
}

export interface IUserProfile {
  _id: string;
  email: string;
  isAdmin: boolean;
  favorites: IProduct[];
  viewed: IProduct[];
  reviews: IReviews[];
  cart: string[];
  createdAt: string;
  updatedAt: string;
  personalData: IPersonalData;
  phone: IPhone;
  address: IAddress;
}

export interface IUserInitialState {
  userProfile: IUserProfile | undefined;
  isError: boolean;
  isLoading: boolean;
}
