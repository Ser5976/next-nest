import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  //это флаги для отображения активной ссылки в меню
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
    | 'for-customers'
    | 'news';
}
