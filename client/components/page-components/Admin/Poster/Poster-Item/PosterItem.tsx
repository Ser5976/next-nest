import styles from './PosterItem.module.css';
import { FC, useState } from 'react';
import { PosterItemProps } from './PosterItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { VscEdit } from 'react-icons/vsc';
import PosterModal from '../Poster-Modal/PosterModal';

const PosterItem: FC<PosterItemProps> = ({ poster }): JSX.Element => {
  //открытие модального окна для редактирование постера
  const [show, setShow] = useState(false);
  // //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление типа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deletePoster } = useMutation(AdminService.deletePoster, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('poster');
      toast.success('Постер  удалён');
    },
    onError: (error: any) => {
      toast.error('Постер не удалён,что-то пошло не так');
    },
  });
  // удаление изображения (url из папки uploads)
  const { mutate: removeUrl } = useMutation(AdminService.removeUrl, {
    onSuccess: () => {
      toast.success('Изображение удалено из папки uploads ');
    },
    onError: (error: any) => {
      toast.error('Изображение  не удалёно,что-то пошло не так');
    },
  });
  // запуск удаление изабражения из базы и папки uploads
  const startDeleteImage = async (posterId: string, url: string) => {
    // удаление изображения(url из базы)
    deletePoster(posterId);
    // удаление изображения (url из папки uploads)
    removeUrl(url);
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{poster.typeId.name}</div>

        <VscEdit className={styles.icon1} onClick={() => setShow(true)} />

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить постер`)) {
              startDeleteImage(poster._id,poster.picture)
            }
          }}
        />
      </div>
      <PosterModal poster={poster} show={show} setShow={setShow} />
    </>
  );
};

export default PosterItem;
