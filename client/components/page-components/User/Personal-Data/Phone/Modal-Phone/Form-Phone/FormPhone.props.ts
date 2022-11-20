import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';

export interface FormPhoneProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  setShow: Dispatch<SetStateAction<boolean>>;
}
