import { CSSProperties, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError, UseFormSetValue } from 'react-hook-form';

export interface InputFileProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  multiple?: boolean;
  error?: FieldError;
  onChange: (...event: any[]) => void;
  setValue: UseFormSetValue<any>;
  isEditing?: boolean;
  name: string;
  style?: CSSProperties;
  image: string[] | undefined;
}
