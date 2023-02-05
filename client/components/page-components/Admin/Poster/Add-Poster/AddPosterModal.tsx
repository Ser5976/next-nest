import styles from './AddPosterModal.module.css';
import { FC } from 'react';
import { AddPosterModalProps } from './AddPosterModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import AddPosterForm from './Add-Poster-Form/AddPosterForm';

const AddPosterModal: FC<AddPosterModalProps> = ({
  show,
  setShow,
  productType,
  refetch,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  // console.log('poster:', poster);
  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Добавить постер</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <AddPosterForm
          productType={productType}
          setShow={setShow}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default AddPosterModal;
