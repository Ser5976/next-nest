import { IUser } from './../../../../store/auth/interface.auth';
import { IUserProfile } from './../../../../store/user/interface.user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeMenu:
    | 'favourites'
    | 'reviews'
    | 'viewed'
    | 'cart'
    | 'personal-data'
    | 'admin-panel'; //это флаги для отображения активной ссылки в меню
}