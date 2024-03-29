import styles from './NewsItem.module.css';
import { FC } from 'react';
import { NewsItemProps } from './NewsItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { VscEdit } from 'react-icons/vsc';

const NewsItem: FC<NewsItemProps> = ({
  news, //данне новости
  refetch, //делает повторный запрос в useQuery
  setShow, //закрытие модального окна
  setSelectedNews, //сохраняем выбранную новость в стэйт для, редактирования
}): JSX.Element => {
  // удаление новости
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteNews } = useMutation(AdminService.deleteNews, {
    onSuccess: () => {
      // при успешном изменении делаем повторный запрос
      refetch();
      toast.success('Новость удалена');
    },
    onError: (error: any) => {
       //здесь показываем ошибку только когда это не 'Unauthorized',
      //при 'Unauthorized' отработает AuthProvider
      if(error.response.data.message !== 'Unauthorized'){
        toast.error('Новость не удалёна,что-то пошло не так');
      }
      
    },
  });
  // открываем модальное окно для редактирование новости,передаём в стейт выбранную новость для редактирования
  const editHandler = () => {
    setShow(true);
    setSelectedNews(news);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{news.name}</div>

        <VscEdit className={styles.icon1} onClick={editHandler} />

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить новсть`)) {
              deleteNews(news._id);
            }
          }}
        />
      </div>
    </>
  );
};

export default NewsItem;
