import { IUserProfile } from './../../../store/user/interface.user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AccountMenuProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  userProfile: IUserProfile | undefined;
}
