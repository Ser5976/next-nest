import axios from 'axios';
import { API } from '../../../constants/url';
import { INews } from '../News-List/NewsList.props';

export const NewsItemService = {
  async getNewsItem(id: string | string[] | undefined) {
    try {
      const { data: news } = await axios.get<INews>(`${API.news}/${id}`);
      return news;
    } catch (error) {
      const news = {} as INews;
      return news;
    }
  },
};
