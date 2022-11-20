import styles from './ModalPhone.module.css';
import { FC } from 'react';
import { ModalPhoneProps } from './ModalPhone.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormPhone from './Form-Phone/FormPhone';

const ModalPhone: FC<ModalPhoneProps> = ({
  show,
  setShow,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false); // чтобы закрыть по клику на любую точку контейнера
  };
  if (!show) return null;

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Изменение телефона</h1>
        <p>
          Только номера со стандартными кодами мобильных операторов: 25, 29, 33,
          44.
        </p>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <FormPhone setShow={setShow} />
      </div>
    </div>
  );
};

export default ModalPhone;
