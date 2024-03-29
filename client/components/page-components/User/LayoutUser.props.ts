import { ReactNode } from 'react';

export interface LayoutUserProps {
  children: ReactNode;
  activeMenu?: 'favourites' | 'reviews' | 'viewed' | 'cart' | 'personal-data';
  //это флаги для отображения активной ссылки в меню
}
