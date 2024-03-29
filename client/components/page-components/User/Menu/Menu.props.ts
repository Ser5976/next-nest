import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeMenu?: 'favourites' | 'reviews' | 'viewed' | 'cart' | 'personal-data';
  //это флаги для отображения активной ссылки в меню
}
