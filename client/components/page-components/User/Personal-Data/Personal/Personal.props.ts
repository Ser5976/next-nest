import { IPersonalData } from './../../../../../store/user/interface.user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PersonalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  personalData: IPersonalData | undefined;
}
