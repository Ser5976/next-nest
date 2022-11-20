import { IPhone } from './../../../../../store/user/interface.user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PhoneProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  phone: IPhone | undefined;
}
