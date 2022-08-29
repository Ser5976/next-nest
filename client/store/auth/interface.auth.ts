export interface IUserState {
  email: string;
  isAdmin: boolean;
}
export interface IUser {
  _id: string;
  email: string;
  isAdmin: boolean;
}
export interface ITokens {
  refreshToken: string;
  accessToken: string;
}
export interface IAuthResponse extends ITokens {
  user: IUser;
}
export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}
