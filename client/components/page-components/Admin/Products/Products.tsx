import styles from './Products.module.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ProductsProps } from './Products.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import { useDebounce } from '../useDebounce';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import ProductItem from './Product-Item/ProductItem';
import { IProduct } from '../../Home/home.service';
import { useData } from '../../../../store/useData';
import { useActions } from '../../../../store/useActions';
import ProductModal from './Product-Modal/ProductModal';

const Products: FC<ProductsProps> = ({
  brands, // массив брэндов товара (для select-form)
  categoryProduct, // массив категорий товара (для select-form)
  productType, // массив типов товара (для select-form)
}): JSX.Element => {
  //открытие модального окна для добавления и редактирование товара
  const [show, setShow] = useState(false);
  console.log('рендеринг');
  //стейт для инпута(поиск товара)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  // данные из стора(количества товаров)
  const {
    adminReducer: { productsQuantity },
  } = useData();
  // экшен из стора по изменению количества товара
  const { getProductsQuantity } = useActions();

  //кастомный хук для задержки времени передачи данных из инпута поиска пользователя в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 700);

  //стейт для выбранного товара
  //нужно для редактирования товара,лень была делать общий стор,берём из ProductItem и передаём в ProductForm)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  //получаем товары
  const {
    isLoading,
    data: dataProducts,
    refetch,
  } = useQuery(
    ['products', debouncedSearch],
    () => AdminService.getProducts(debouncedSearch),

    {
      onSuccess: (dataProducts) => {
        // смотрим если количество пользователе в базе поменялось, только тогда меняем
        if (productsQuantity !== dataProducts.quantity) {
          getProductsQuantity(dataProducts.quantity);
        }
      },

      onError: () => {
        toast.error('Данные не получены, попробуйте ещё раз');
      },
      enabled: !!searchTerm, // запускается  когда есть данные в поисковом инпуте
    }
  );
  // чтобы загрузились данные первично при загрузке страницы
  useEffect(() => {
    refetch();
  }, [searchTerm]);

  return (
    <LayoutAdmin activeMenu="product">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">Товары</h1>
      <div className={styles.container}>
        <SearchInputAdmin
          searchTerm={searchTerm}
          handleInput={handlerInput}
          placeholderText="введите название товара . . ."
        />
        <div
          className={styles.button}
          onClick={() => {
            setShow(true);
          }}
        >
          Добавить товар
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        dataProducts?.products?.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              refetch={refetch}
              setShow={setShow}
              setSelectedProduct={setSelectedProduct}
            />
          );
        })
      )}
      <ProductModal
        setShow={setShow}
        show={show}
        categoryProduct={categoryProduct}
        brands={brands}
        productType={productType}
        refetch={refetch}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </LayoutAdmin>
  );
};

export default Products;
