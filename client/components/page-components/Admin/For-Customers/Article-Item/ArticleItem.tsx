import styles from './ArticleItem.module.css';
import { FC } from 'react';
import { ArticleItemProps } from './ArticleItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { VscEdit } from 'react-icons/vsc';

const ArticleItem: FC<ArticleItemProps> = ({
  article,
  refech,
  setShow,
  setArticle, //сохраняем выбранную статью в стэйт для, редактирования
}): JSX.Element => {
  // удаление статьи
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteArticle } = useMutation(AdminService.deleteArticle, {
    onSuccess: () => {
      // при успешном изменении делаем повторный запрос
      refech();
      toast.success('статья удалена');
    },
    onError: (error: any) => {
      toast.error('статья не удалён,что-то пошло не так');
    },
  });
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
