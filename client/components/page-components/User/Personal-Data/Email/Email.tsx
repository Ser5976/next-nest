import styles from './Email.module.css';
import { FC, useState } from 'react';
import { EmailProps } from './Email.props';
import { AiOutlineMail } from 'react-icons/ai';
import { VscEdit } from 'react-icons/vsc';
import ModalEmail from './Modal-Email/ModalEmail';

const Email: FC<EmailProps> = ({ email }): JSX.Element => {
  //открытие модального окна для редактирование имени юзера
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <AiOutlineMail className={styles.icon1} />
        <div className={styles.label}>
          <div>Почта</div>
          <span>{email}</span>
        </div>
        <VscEdit className={styles.icon2} onClick={() => setShow(true)} />
      </div>
      <ModalEmail show={show} setShow={setShow} />
    </>
  );
};

export default Email;
