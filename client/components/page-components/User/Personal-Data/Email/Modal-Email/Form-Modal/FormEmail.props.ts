import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';

export interface FormEmailProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  setShow: Dispatch<SetStateAction<boolean>>;
}
