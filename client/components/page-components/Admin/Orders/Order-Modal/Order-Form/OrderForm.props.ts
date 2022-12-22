import { IOrders } from '../../../../../../store/admin/interface.admin';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface OrderFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  order: IOrders;
}
