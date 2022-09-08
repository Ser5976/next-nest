import { ICategoryProduct } from './../../../../store/category-product/interface.categoryProduct';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CategoryProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  category: ICategoryProduct | undefined;
}
