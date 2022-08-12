import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CatalogMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  showCatalog: boolean;
}
