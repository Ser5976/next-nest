import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';

export interface ModalOrderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  order: string[];
  totalPriceProduct: number | undefined;
}
