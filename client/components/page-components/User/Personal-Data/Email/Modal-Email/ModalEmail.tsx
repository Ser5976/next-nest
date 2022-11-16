import styles from './ModalEmail.module.css';
import { FC } from 'react';
import { ModalEmailProps } from './ModalEmail.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormEmail from './Form-Modal/FormEmail';

const ModalEmail: FC<ModalEmailProps> = ({
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
        <FormEmail setShow={setShow} />
      </div>
    </div>
  );
};

export default ModalEmail;
