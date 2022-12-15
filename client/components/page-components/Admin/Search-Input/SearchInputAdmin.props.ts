import { ChangeEvent, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SearhInputAdminProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  searchTerm: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
}
