import { ICategoryProduct } from './../../../../store/category-product/interface.categoryProduct';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IBrand } from '../admin.service';
import { IType } from '../../../../store/type-product/interface.typeProduct';

export interface ProductsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  brands: IBrand[];
}
