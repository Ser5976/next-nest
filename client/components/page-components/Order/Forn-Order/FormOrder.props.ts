import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';

export interface FormOrderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  setShow: Dispatch<SetStateAction<boolean>>;
  order: string[];
  totalPriceProduct: number | undefined;
}
