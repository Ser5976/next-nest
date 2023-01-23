import styles from './Poster.module.css';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { PosterProps } from './Poster.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService, IPoster } from '../admin.service';
import { toast } from 'react-toastify';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import PosterItem from './Poster-Item/PosterItem';
import AddPosterModal from './Add-Poster/AddPosterModal';

const Poster: FC<PosterProps> = ({ productType }): JSX.Element => {
  //открытие модального окна для редактирование постера
  const [show, setShow] = useState(false);
  //стэйт для постера
  const [posters, setPoster] = useState<IPoster[] | undefined>([]);
  //стейт для инпута(поиск пользователя)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем постеры и записываем в стейт
  const { isLoading, data } = useQuery(
    'poster',
    () => AdminService.getPoster(),

    {
      onSuccess: (getPoster) => {
        setPoster(getPoster);
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );

  // поиск постера(данные берём из инпута) и делаем это на клиенте, useMemo для оптимизации
  // тут я немного на костылел, ну, как есть
  useMemo(() => {
    const search = data?.filter((poster) =>
      poster.typeId.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
    setPoster(search);
    return search;
  }, [searchTerm]);

  return (
    <LayoutAdmin activeMenu="poster">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">
        Постеры страниц товаров
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
            Добавить постер
          </div>
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        posters?.map((poster) => {
          return <PosterItem key={poster._id} poster={poster} />;
        })
      )}
      <AddPosterModal setShow={setShow} show={show} productType={productType} />
    </LayoutAdmin>
  );
};

export default Poster;
