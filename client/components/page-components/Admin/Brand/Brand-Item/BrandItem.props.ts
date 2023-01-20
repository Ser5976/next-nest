import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IBrand } from '../../admin.service';

export interface BrandItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  brand: IBrand;
}
