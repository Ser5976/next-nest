import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { IType } from '../../../../../store/type-product/interface.typeProduct';

export interface BrandProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  typeName: IType;
  checkBox: string[];
  setCheckBox: Dispatch<SetStateAction<string[]>>;
  // checked: { [key: string]: boolean };
  // setChecked: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}
