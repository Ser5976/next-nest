import { IType } from './../../../../store/type-product/interface.typeProduct';
import { IProductType } from './../../../../store/category-product/interface.categoryProduct';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FilterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  typeName: IType | undefined;
}
