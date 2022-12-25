import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeMenu?: 'orders' | 'reviews' | 'product' | 'users'|'slider';
  //это флаги для отображения активной ссылки в меню
}
