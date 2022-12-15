import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUsers } from '../../../../../store/admin/interface.admin';

export interface UserItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  users: IUsers;
}
