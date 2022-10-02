import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProductTypes from '../../../components/page-components/Product-Types/ProductTypes';
import { IFilteredProduct } from '../../../components/page-components/Product-Types/ProductTypes.props';
import { ProductTypesService } from '../../../components/page-components/Product-Types/productTypes.service';
import Pagination from '../../../components/ui/Pagination/Pagination';
import { HeaderService } from '../../../header-service/header.service';
import { Layout } from '../../../Layout/Layout';
import { getCategoryProduct } from '../../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../../store/customers/customersSlice';
import { IArticle } from '../../../store/customers/interface.customers';
import { wrapper } from '../../../store/store';
import { getProductType } from '../../../store/type-product/catecoryProductSlice';
import { IType } from '../../../store/type-product/interface.typeProduct';
// пример универсального динамического роутинга [...filter],преимущества- не нужно делать новую страницу
// будет одна страница для фильтрации и пагинации
const FilterPage: NextPage<FilterProps> = ({
  product, //объект с массивом продуктов, количеством продуктов,количеством страниц
  productType, // массив типов товара
  type, //id типа товара, выбранного из адресной строки
  filter, //данные, которые выбраны для фильтации(это брэнд и диапазон цены или просто брэнд)
  //получаем из параметров(в адресной сторке), для формирование ссылки для пагинации
}) => {
  const router = useRouter();
  return (
    <Layout
      title=" Product types page"
      description="Тренировочный проект eCommerce"
    >
      {/* это из-за fallback: true,если не сделать условие, build покажеть ошибку */}
      {router.isFallback ? (
        <h1>Идёт загрузка...</h1>
      ) : (
        <>
          <div>Фильтр</div>
          <ProductTypes
            product={product}
            type={type}
            productType={productType}
          />
          <Pagination
            count={product.count}
            type={type}
            pageQty={product.pageQty}
            selectedPath="filter"
            filter={filter}
          />
        </>
      )}
    </Layout>
  );
};

// прописываем пути(ключи в объекте params это то, что в квадратных скобках,)
export const getStaticPaths = async () => {
  const productType = await HeaderService.getProductType(); //кастомный сервис для запроса  типов продуктов
  const paths = productType.slice(0, 1).map((type) => {
    return {
      params: { types: type._id, filter: [' brandId-minPrice-maxPrice ', '1'] }, // в отличии от динамического
      //здесь массив путей. Массив путей в нашем сулучае состоит из двух значений: сами данные по фильтрации и
      // пагинация-номер страницы. Данные фильтрации это брэнд и минимальная и максимальная цена ,  мы передаем
      //одной строкой(здесь два варианта или один брэнд или брэнд и цена).В этом случае я написал произвольное значение
      // и кажись работает.Если что можно было из  массива productType.brand вытянуть любой id брэнда
    };
  });
  return {
    paths: paths,
    fallback: true, //это для того ,чтобы подгружались новые динамические пути
  };
};

const limit = 1;
// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<FilterProps> =
  wrapper.getStaticProps((store) => async (ctx) => {
    console.log('Стор', store.getState().categoryProducReducer.categoryProduct);
    const { params } = ctx;
    console.log('params:', params);
    // вычисляем из запроса номер страницы ,если нет то 1
    const page = params?.filter?.[1] ? params?.filter?.[1] : '1';
    //маленький кастыль: из параметров извлекаем строку по фильтрации
    //из этой строки получаем данные по фильтрации(brandId,minPrice,maxPrice)
    // используем их для запроса
    const filtres = params?.filter?.[0].toString().split('-');
    //console.log(filtres);

    //---------- для Header-----------------------------------//
    //получение forCustomers (для клиентов)
    const forCustomers = await HeaderService.getForCustomers(); // кастомный сервис для запроса  для клиентов
    // отправляем данные в редакс
    store.dispatch(getForCustomers(forCustomers));
    // получение categoryProduct
    const categoryProduct = await HeaderService.getСategoryProduct(); // кастомный сервис для запроса  категории продуктов
    store.dispatch(getCategoryProduct(categoryProduct));
    //получение productType
    const productType = await HeaderService.getProductType(); //кастомный сервис для запроса  типов продуктов
    store.dispatch(getProductType(productType));

    //------------- данные для ProductTypesPage ---------------------------------//
    const product = await ProductTypesService.getProduct(
      params?.types,
      page,
      limit,
      filtres
    );

    return {
      props: {
        forCustomers,
        categoryProduct,
        productType,
        product,
        type: params?.types,
        filter: params?.filter?.[0],
      },
      revalidate: 10,
    };
  });

interface FilterProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  product: IFilteredProduct;
  type: string | string[] | undefined;
  filter: string | string[] | undefined;
}

export default FilterPage;
