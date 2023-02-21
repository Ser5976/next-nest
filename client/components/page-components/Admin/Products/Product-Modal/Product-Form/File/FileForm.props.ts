import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { IProduct } from '../../../../../Home/home.service';

export interface FileFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  selectedProduct: IProduct | null;
}
