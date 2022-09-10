import { IArticle } from './../../../store/customers/interface.customers';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ArticleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  article: IArticle;
}
