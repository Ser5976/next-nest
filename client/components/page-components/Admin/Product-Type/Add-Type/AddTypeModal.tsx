import styles from './AddTypeModal.module.css';
import { FC } from 'react';
import { AddTypeModalProps } from './AddTypeModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import AddTypeForm from './Add-Type-Form/AddTypeForm';

const AddTypeModal: FC<AddTypeModalProps> = ({
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
        <h1 className=" text-lg">Добавить тип</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <AddTypeForm setShow={setShow} />
      </div>
    </div>
  );
};

export default AddTypeModal;
