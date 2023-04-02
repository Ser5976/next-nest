import { ICharacteristics } from './../../../../../store/type-product/interface.typeProduct';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export interface CharacteristicsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  characteristics: ICharacteristics[];
  checkBox: any[];
  setCheckBox: Dispatch<SetStateAction<{ title: string; property: string }[]>>;
}
