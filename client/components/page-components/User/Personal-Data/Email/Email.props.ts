import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface EmailProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  email: string | undefined;
}
