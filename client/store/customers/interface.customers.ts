export interface IArticle {
  _id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
export interface IInitialState {
  forCustomers: IArticle[];
  isLoading: boolean;
}
