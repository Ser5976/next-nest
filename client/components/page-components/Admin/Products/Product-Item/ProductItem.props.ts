import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { IProduct } from '../../../Home/home.service';

export interface ProductItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
  setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<
    QueryObserverResult<{ products: IProduct[]; quantity: number }, unknown>
  >;
}
