import styles from './AddBrandModal.module.css';
import { FC } from 'react';
import { AddBrandModalProps } from './AddBrandModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import AddBrandForm from './Add-Brand-Form/AddBrandForm';

const AddBrandModal: FC<AddBrandModalProps> = ({
  show, //открытие модального окна
  setShow, //для закрытия модального окна
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Добавить брэнд</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <AddBrandForm setShow={setShow} />
      </div>
    </div>
  );
};

export default AddBrandModal;
