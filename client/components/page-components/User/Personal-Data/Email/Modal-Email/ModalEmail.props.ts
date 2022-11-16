import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';

export interface ModalEmailProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
