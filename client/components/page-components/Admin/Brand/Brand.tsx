import styles from './Brand.module.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { BrandProps } from './Brand.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import { useDebounce } from '../useDebounce';
import BrandItem from './Brand-Item/BrandItem';
import AddBrandModal from './Add-Brand/AddBrandModal';

const Brand: FC<BrandProps> = ({}): JSX.Element => {
  console.log('рендер');
  //открытие модального окна для редактирования брэнда
  const [show, setShow] = useState(false);
  //стейт для инпута(поиск)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  //кастомный хук для задержки времени передачи данных из инпута поиска  в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 700);
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  //получаем  все брэнды
  const {
    isLoading,
    refetch,
    data: brand,
  } = useQuery(
    ['brand', debouncedSearch],
    () => AdminService.getBrand(debouncedSearch),

    {
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [searchTerm]);

  return (
    <LayoutAdmin activeMenu="brand">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">Брэнды</h1>
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
            Добавить брэнд
          </div>
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        brand?.map((brand) => {
          return <BrandItem brand={brand} key={brand._id} />;
        })
      )}
      <AddBrandModal setShow={setShow} show={show} />
    </LayoutAdmin>
  );
};

export default Brand;
