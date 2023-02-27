import styles from './ArticleItem.module.css';
import { FC } from 'react';
import { ArticleItemProps } from './ArticleItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { VscEdit } from 'react-icons/vsc';

const ArticleItem: FC<ArticleItemProps> = ({
  article, //статья
  refetch, //делает повторный запрос в useQuery
  setShow, //закрытие модального окна
  setArticle, //сохраняем выбранную статью в стэйт для, редактирования
}): JSX.Element => {
  // удаление статьи
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteArticle } = useMutation(AdminService.deleteArticle, {
    onSuccess: () => {
      // при успешном изменении делаем повторный запрос
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
      toast.success('статья удалена');
    },
    onError: (error: any) => {
      toast.error('статья не удалён,что-то пошло не так');
    },
  });
  // открываем модальное окно для редактирование новости,передаём в стейт выбранную новость для редактирования
  const editHandler = () => {
    setShow(true);
    setArticle(article);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{article.title}</div>

        <VscEdit className={styles.icon1} onClick={editHandler} />

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить постер`)) {
              deleteArticle(article._id);
            }
          }}
        />
      </div>
    </>
  );
};

export default ArticleItem;
