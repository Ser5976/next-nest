import styles from './Phone.module.css';
import { FC, useState } from 'react';
import { PhoneProps } from './Phone.props';
import { VscEdit } from 'react-icons/vsc';
import { BsTelephoneForward } from 'react-icons/bs';
import ModalPhone from './Modal-Phone/ModalPhone';

const Phone: FC<PhoneProps> = ({ phone }): JSX.Element => {
  //открытие модального окна для редактирование имени юзера
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <BsTelephoneForward className={styles.icon1} />
        <div className={styles.label}>
          <div>Телефон</div>
          {phone?.phone ? (
            <span>{phone.phone}</span>
          ) : (
            <span>+375() --- -- --</span>
          )}
        </div>
        <VscEdit className={styles.icon2} onClick={() => setShow(true)} />
      </div>
      <ModalPhone show={show} setShow={setShow} />
    </>
  );
};

export default Phone;
