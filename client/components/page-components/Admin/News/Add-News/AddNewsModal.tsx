import styles from './AddNewsModal.module.css';
import { FC } from 'react';
import { AddNewsModalProps } from './AddNewsModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import AddNewsForm from './Add-News-Form/AddNewsForm';

const AddNewsModal: FC<AddNewsModalProps> = ({
  show,
  setShow,
  setSelectedNews,
  refetch,
  selectedNews,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false); //это что бы по клику на область вне формы закрывалась модальное окно
  };
  if (!show) return null;
  const handlerClose = () => {
    setShow(false);
    setSelectedNews(''); //очищаем стэйт выбранной новости
  };

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Добавить новость</h1>
        <TiDeleteOutline className={styles.icon} onClick={handlerClose} />
        <AddNewsForm
          setShow={setShow}
          refetch={refetch}
          selectedNews={selectedNews}
        />
      </div>
    </div>
  );
};

export default AddNewsModal;
