import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { IUsers } from '../../../../../store/admin/interface.admin';

export interface UserItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  users: IUsers;
  refech: () => Promise<
    QueryObserverResult<{ users: IUsers[]; quantity: number }, unknown>
  >;
}
