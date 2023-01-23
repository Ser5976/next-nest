import { ChangeEvent, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SearhInputAdminProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  placeholderText:
    | 'введите email . . .'
    | 'введите имя . . .'
    | 'введите  тип товара . . .'
    | 'введите категорию товара . . .';
  searchTerm: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
}
