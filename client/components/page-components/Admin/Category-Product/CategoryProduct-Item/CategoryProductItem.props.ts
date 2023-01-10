import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICategoryProduct } from '../../../../../store/category-product/interface.categoryProduct';

export interface CategoryProductItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  category: ICategoryProduct;
}
