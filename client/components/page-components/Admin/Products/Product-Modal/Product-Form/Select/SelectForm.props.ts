import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICategoryProduct } from '../../../../../../../store/category-product/interface.categoryProduct';
import { IType } from '../../../../../../../store/type-product/interface.typeProduct';
import { IProduct } from '../../../../../Home/home.service';
import { IBrand } from '../../../../admin.service';

export interface SelectFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  brands: IBrand[];
}
