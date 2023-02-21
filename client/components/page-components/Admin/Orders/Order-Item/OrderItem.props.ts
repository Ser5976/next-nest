import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { IOrders } from '../../admin.service';

export interface OrderItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  order: IOrders;
  refech: () => Promise<
    QueryObserverResult<{ orders: IOrders[]; quantity: number }, unknown>
  >;
}
