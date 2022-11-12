import { IUserProfile } from './../../../store/user/interface.user';
import { ReactNode } from 'react';

export interface LayoutUserProps {
  children: ReactNode;
  activeMenu:
    | 'favourites'
    | 'reviews'
    | 'viewed'
    | 'cart'
    | 'personal-data'
    | 'admin-panel'; //это флаги для отображения активной ссылки в меню
}
