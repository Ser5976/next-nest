import styles from './ModalPersonal.module.css';
import { FC } from 'react';
import { ModalPersonalProps } from './ModalPersonal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormPersonal from './Form-Personal/FormPersonal';

const ModalPersonal: FC<ModalPersonalProps> = ({
  show, //открытие модального окна
  setShow, // закрытие модального окна
  personalData, //данные по юзеру
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Изменение профиля</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <FormPersonal setShow={setShow} personalData={personalData} />
      </div>
    </div>
  );
};

export default ModalPersonal;
