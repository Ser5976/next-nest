import { ReactNode } from 'react';

export interface LayoutAdminProps {
  children: ReactNode;
  activeMenu?:
    | 'orders'
    | 'reviews'
    | 'product'
    | 'users'
    | 'slider'
    | 'poster'
    | 'category'
    | 'type'
    | 'brand'
  //это флаги для отображения активной ссылки в меню
}
