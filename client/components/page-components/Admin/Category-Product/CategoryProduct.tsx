import styles from './CategoryProduct.module.css';
import cn from 'classnames';
import { ChangeEvent, FC, useState } from 'react';
import { CategoryProductProps } from './CategoryProdyct.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import { ICategoryProduct } from '../../../../store/category-product/interface.categoryProduct';
import { useDebounce } from '../useDebounce';
import CategoryProductItem from './CategoryProduct-Item/CategoryProductItem';
import AddCategoryModal from './Add-Category/AddCategoryModal';

const CategoryProduct: FC<CategoryProductProps> = ({}): JSX.Element => {
  //открытие модального окна для редактирование постера
  const [show, setShow] = useState(false);
  //стэйт для категории
  const [category, setCategory] = useState<ICategoryProduct[] | undefined>([]);
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

  //получаем  все категории
  const {
    isLoading,
    refetch,
    data: categoryP,
  } = useQuery(
    'category product',
    () => AdminService.getCategoryProduct(),

    {
      onSuccess: (categoryP) => {
        setCategory(categoryP.categoryProduct);
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );

  // поиск пользователя(данные берём из инпута ,
  //потом при помощи useDebounce замедляем и только потом передаём в useQuery )
  const { isLoading: loadingSearch } = useQuery(
    ['search category', debouncedSearch],
    () => AdminService.getFoundCategory(debouncedSearch),
    {
      onSuccess: (category) => {
        setCategory(category);
      },
      onError: () => {
        toast.error('данные не получены ,что то пошло не так');
      },
      enabled: !!searchTerm,
    }
  );

  //запуск useQuery (запрос всех постеров) и очистка инпута
  const repeatRaquest = () => {
    setSearchTerm('');
    refetch();
  };

  return (
    <LayoutAdmin activeMenu="category">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">
        Категории товаров
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
            Добавить категорию
          </div>
          <div
            className={cn(styles.button, {
              [styles.disableButton]: categoryP?.count === category?.length,
            })}
            onClick={repeatRaquest}
          >
            Все категории
          </div>
        </div>
      </div>
      {isLoading || loadingSearch ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        category?.map((category) => {
          return <CategoryProductItem key={category._id} category={category} />;
        })
      )}
      <AddCategoryModal setShow={setShow} show={show} />
    </LayoutAdmin>
  );
};

export default CategoryProduct;
