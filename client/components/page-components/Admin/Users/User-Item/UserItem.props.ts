import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { IUsers } from '../../admin.service';

export interface UserItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  users: IUsers;
  refech: () => Promise<
    QueryObserverResult<{ users: IUsers[]; quantity: number }, unknown>
  >;
}
