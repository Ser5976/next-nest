import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { IType } from '../../../../../../store/type-product/interface.typeProduct';

export interface AddPosterFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  productType: IType[];
  setShow: Dispatch<SetStateAction<boolean>>;
}
