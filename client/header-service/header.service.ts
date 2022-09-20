import { IType } from './../store/type-product/interface.typeProduct';
import { ICategoryProduct } from './../store/category-product/interface.categoryProduct';
import { IArticle } from './../store/customers/interface.customers';
import axios from 'axios';
import { API } from '../constants/url';

export const HeaderService = {
  async getForCustomers() {
    try {
      const { data: forCustomers } = await axios.get<IArticle[]>(API.customers);
      return forCustomers;
    } catch (error) {
      const forCustomers: IArticle[] = [];
      return forCustomers;
    }
  },
  async getСategoryProduct() {
    try {
      const { data: categoryProduct } = await axios.get<ICategoryProduct[]>(
        API.categoryProduct
      );
      return categoryProduct;
    } catch (error) {
      const categoryProduct: ICategoryProduct[] = [];
      return categoryProduct;
    }
  },
  async getProductType() {
    try {
      const { data: productType } = await axios.get<IType[]>(API.productType);
      return productType;
    } catch (error) {
      const productType: IType[] = [];
      return productType;
    }
  },
};
