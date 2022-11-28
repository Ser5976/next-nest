import { IAddress } from '../../../../../store/user/interface.user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AddressProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  address: IAddress | undefined;
}
