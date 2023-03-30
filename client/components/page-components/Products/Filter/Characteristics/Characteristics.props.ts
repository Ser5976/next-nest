import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { IType } from '../../../../../store/type-product/interface.typeProduct';

export interface CharacteristicsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  typeName: IType;
  checkBox: any[];
  setCheckBox: Dispatch<SetStateAction<{ title: string; property: string }[]>>;
}
