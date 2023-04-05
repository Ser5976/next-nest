import { IProduct } from './../../../../../Home/home.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICategoryProduct } from '../../../../../../../store/category-product/interface.categoryProduct';
import { IType } from '../../../../../../../store/type-product/interface.typeProduct';
import { IBrand } from '../../../../admin.service';

export interface SelectFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  brands: IBrand[];
  selectedProduct: IProduct | null;
}
