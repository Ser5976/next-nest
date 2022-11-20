import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: 'text' | 'email' | 'password' | 'date' | 'tel' | 'number';
  placeholder?: string;
  error?: FieldError;
  scale?: 'small' | 'larg';
}
