import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IOrders } from '../../../admin.service';

export interface OrderFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  order: IOrders;
}
