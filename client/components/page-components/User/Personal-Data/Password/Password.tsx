import styles from './Password.module.css';
import { FC, useState } from 'react';
import { PasswordProps } from './Password.props';
import { VscEdit } from 'react-icons/vsc';
import { RiLockPasswordLine } from 'react-icons/ri';
import ModalPassword from './Modal-Password/ModalPassword';

const Password: FC<PasswordProps> = ({}): JSX.Element => {
  //открытие модального окна для редактирование имени юзера
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <RiLockPasswordLine className={styles.icon1} />
        <div className={styles.label}>
          <div>Пароль</div>
          <span>......</span>
        </div>
        <VscEdit className={styles.icon2} onClick={() => setShow(true)} />
      </div>
      <ModalPassword show={show} setShow={setShow} />
    </>
  );
};

export default Password;
