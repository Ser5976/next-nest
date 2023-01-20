import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IType } from '../../../../../store/type-product/interface.typeProduct';

export interface ProductTypeItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: IType;
}
