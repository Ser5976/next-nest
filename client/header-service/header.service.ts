import { IBrand } from './../components/page-components/Admin/admin.service';
import { IType } from './../store/type-product/interface.typeProduct';
import { ICategoryProduct } from './../store/category-product/interface.categoryProduct';
import { IArticle } from './../store/customers/interface.customers';
import axios from 'axios';
import { API } from '../constants/url';
import { IUserProfile } from '../store/user/interface.user';
import customAxios from '../custom-axios/axiox-interceptors';

export const HeaderService = {
  // запрос получение forCustomers (для клиентов) через GetStaticProps
  async getForCustomers() {
    try {
      const { data: forCustomers } = await axios.get<IArticle[]>(API.customers);
      return forCustomers;
    } catch (error) {
      const forCustomers: IArticle[] = [];
      return forCustomers;
    }
  },
  // запрос получение категории товаров через GetStaticProps
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
  // запрос получение типов товаров  через GetStaticProps
  async getProductType() {
    try {
      const { data: productType } = await axios.get<IType[]>(API.productType);
      return productType;
    } catch (error) {
      const productType: IType[] = [];
      return productType;
    }
  },
  // запрос получение брэндов товаров  через GetStaticProps
  async getStaticBrand() {
    try {
      const { data: brands } = await customAxios.get<IBrand[]>(API.admin.brand);
      return brands;
    } catch (error) {
      const brands: IBrand[] = [];
      return brands;
    }
  },

  //  запрос получение  полных данных юзера через useQuery(  react-query)
  async getUserProfile() {
    console.log(' получен профиль юзера');
    const { data: userProfile } = await customAxios.get<
      IUserProfile | undefined
    >(API.userProfile);
    return userProfile;
  },
};
