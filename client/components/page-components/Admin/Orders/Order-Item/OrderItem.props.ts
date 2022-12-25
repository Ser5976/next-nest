import { IOrders } from './../../../../../store/admin/interface.admin';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface OrderItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  order: IOrders;
}
