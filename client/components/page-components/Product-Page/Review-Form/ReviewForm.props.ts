import { IProduct } from './../../Home/home.service';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';

export interface ReviewFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  product: IProduct;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}
