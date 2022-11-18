import styles from './ModalPassword.module.css';
import { FC } from 'react';
import { ModalPasswordProps } from './ModalPassword.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormPassword from './Form-Password/FormPassword';

const ModalPassword: FC<ModalPasswordProps> = ({
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
        <h1 className=" text-lg">Изменение почты</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <FormPassword setShow={setShow} />
      </div>
    </div>
  );
};

export default ModalPassword;
