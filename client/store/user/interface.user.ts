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
  flat: string;
}

export interface IUser {
  _id: string;
  email: string;
  isAdmin: boolean;
  favorites: IProduct[];
  viewed: IProduct[];
  cart: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  personalData: IPersonalData;
  phone: IPhone;
  address: IAddress;
}

export interface IUserInitialState {
  user: IUser;
}
