import styles from './AddArticleModal.module.css';
import { FC } from 'react';
import { AddArticleModalProps } from './AddArticleModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import AddArticleForm from './Add-Article-Form/AddArticleForm';

const AddArticleModal: FC<AddArticleModalProps> = ({
  show, //открытие модального окна
  setShow, //используем для закрытия модального окна
  setArticle, // для очищения стейта выбранной статьи
  refetch, //делает повторный запрос в useQuery
  article, //статья
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    //это что бы по клику на область вне формы закрывалась модальное окно
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;
  const handlerClose = () => {
    setShow(false);
    setArticle(''); //очищаем стэйт выбранной статьи
  };

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Добавить статью</h1>
        <TiDeleteOutline className={styles.icon} onClick={handlerClose} />
        <AddArticleForm setShow={setShow} refetch={refetch} article={article} />
      </div>
    </div>
  );
};

export default AddArticleModal;
