import styles from './ProductType.module.css';
import cn from 'classnames';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ProductTypeProps } from './ProdyctType.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery, useQueryClient } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import { useDebounce } from '../useDebounce';
import { IType } from '../../../../store/type-product/interface.typeProduct';
import ProductTypeItem from './ProductType-Item/ProductTypeItem';
import AddTypeModal from './Add-Type/AddTypeModal';

const ProductType: FC<ProductTypeProps> = ({}): JSX.Element => {
  //открытие модального окна для редактирование постера
  const [show, setShow] = useState(false);
  //стэйт для типа
  const [types, setTypes] = useState<IType[] | undefined>([]);
  //стейт для инпута(поиск пользователя)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  //кастомный хук для задержки времени передачи данных из инпута поиска пользователя в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 700);
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
 
  //получаем  все типы
  const {
    isLoading,
    refetch,
    data: productsTypes,
  } = useQuery(
    'product type',
    () => AdminService.getProductType(),

    {
      onSuccess: (productsTypes) => {
        console.log('работает')
       setTypes(productsTypes.productsTypes);
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );

  // поиск типа(данные берём из инпута ,
  //потом при помощи useDebounce замедляем и только потом передаём в useQuery )
  const { isLoading: loadingSearch } = useQuery(
    ['search type', debouncedSearch],
    () => AdminService.getFoundType(debouncedSearch),
    {
      onSuccess: (type) => {
       setTypes(type);
      },
      onError: () => {
        toast.error('данные не получены ,что то пошло не так');
      },
      enabled: !!searchTerm,
    }
  );

  //запуск useQuery (запрос всех типов) и очистка инпута
  const repeatRaquest = () => {
    setSearchTerm('');
    refetch();
  };

  return (
    <LayoutAdmin activeMenu="type">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">
        Типы товаров
      </h1>
      <div className={styles.container}>
        <SearchInputAdmin
          searchTerm={searchTerm}
          handleInput={handlerInput}
          placeholderText="введите  тип товара . . ."
        />
        <div className="flex gap-3">
          <div
            className={styles.button}
            onClick={() => {
              setShow(true);
            }}
          >
            Добавить тип
          </div>
          <div
            className={cn(styles.button, {
              [styles.disableButton]: productsTypes?.count === types?.length,
            })}
            onClick={repeatRaquest}
          >
            Все типы
          </div>
        </div>
      </div>
      {isLoading || loadingSearch ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        types?.map((type) => {
          return <ProductTypeItem setTypes={setTypes} key={type._id} type={type} />;
        })
      )}
      <AddTypeModal setShow={setShow} show={show} />
    </LayoutAdmin>
  );
};

export default ProductType;
