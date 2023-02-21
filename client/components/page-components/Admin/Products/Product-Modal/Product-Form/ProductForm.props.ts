import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { ICategoryProduct } from '../../../../../../store/category-product/interface.categoryProduct';
import { IType } from '../../../../../../store/type-product/interface.typeProduct';
import { IProduct } from '../../../../Home/home.service';
import { IBrand } from '../../../admin.service';

export interface ProductFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  setShow: Dispatch<SetStateAction<boolean>>;
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  brands: IBrand[];
  refetch: () => Promise<
    QueryObserverResult<{ products: IProduct[]; quantity: number }, unknown>
  >;
  selectedProduct: IProduct | null;
  setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
}
