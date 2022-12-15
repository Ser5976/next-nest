import { IPhone, IPersonalData, IAddress } from './../user/interface.user';

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
export interface IAdminInitialState {
  usersForAdmin: IUsersForAdmin;
}
