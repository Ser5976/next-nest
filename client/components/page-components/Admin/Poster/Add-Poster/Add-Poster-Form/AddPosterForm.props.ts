import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { IType } from '../../../../../../store/type-product/interface.typeProduct';
import { IPoster } from '../../../admin.service';

export interface AddPosterFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  productType: IType[];
  setShow: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult<IPoster[], unknown>>;
}
