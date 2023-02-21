import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { IType } from '../../../../../store/type-product/interface.typeProduct';
import { IPoster } from '../../admin.service';

export interface AddPosterModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  productType: IType[];
  refetch: () => Promise<QueryObserverResult<IPoster[], unknown>>;
}
