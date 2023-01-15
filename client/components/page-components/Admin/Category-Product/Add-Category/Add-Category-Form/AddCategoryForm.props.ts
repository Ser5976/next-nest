import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export interface AddCategoryFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  setShow: Dispatch<SetStateAction<boolean>>;
}
