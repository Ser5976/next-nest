import { IType } from './../../../../store/type-product/interface.typeProduct';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FilterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  typeName: IType;
}
