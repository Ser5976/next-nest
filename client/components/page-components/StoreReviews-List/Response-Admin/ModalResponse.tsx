import styles from './ModalResponse.module.css';
import { FC } from 'react';
import { ModalResponseProps } from './ModalResponse.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormResponse from './Form-Response/FormResponse';

const ModalResponse: FC<ModalResponseProps> = ({
  show,
  setShow,
  reviewId,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false); // чтобы закрыть по клику на любую точку контейнера
  };
  if (!show) return null;

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Ответ на отзыв</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <FormResponse setShow={setShow} reviewId={reviewId} />
      </div>
    </div>
  );
};

export default ModalResponse;
