import styles from './AddCategoryModal.module.css';
import { FC } from 'react';
import { AddCategoryModalProps } from './AddCatygoryModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import AddCategoryForm from './Add-Category-Form/AddCategoryForm';

const AddCategoryModal: FC<AddCategoryModalProps> = ({
  show,
  setShow,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Добавить категорию</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <AddCategoryForm setShow={setShow} />
      </div>
    </div>
  );
};

export default AddCategoryModal;
