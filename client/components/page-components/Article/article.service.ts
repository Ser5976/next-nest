import { IArticle } from './../../../store/customers/interface.customers';
import axios from 'axios';
import { API } from '../../../constants/url';

export const ArticleService = {
  async getArticle(slug: string | string[] | undefined) {
    try {
      const { data: article } = await axios.get<IArticle>(
        `${API.customers}/${slug}`
      );
      return article;
    } catch (error) {
      const article: IArticle = {} as IArticle;
      return article;
    }
  },
};
