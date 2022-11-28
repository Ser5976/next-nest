import styles from './Personal.module.css';
import { FC, useState } from 'react';
import { PersonalProps } from './Personal.props';
import { BsPerson } from 'react-icons/bs';
import { VscEdit } from 'react-icons/vsc';
import ModalPersonal from './Modal-Personal/ModalPersonal';

const Personal: FC<PersonalProps> = ({ personalData }): JSX.Element => {
  //открытие модального окна для редактирование имени юзера
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <BsPerson className={styles.icon1} />
        <div className={styles.label}>
          <div>Имя</div>
          {personalData?.name ? (
            <span>{personalData.name}</span>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className={styles.label}>
          <div>Пол</div>
          {personalData?.gender ? (
            <span>{personalData.gender}</span>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className={styles.label}>
          <div>Дата рождения</div>
          {personalData?.birthday ? (
            <span>{personalData.birthday}</span>
          ) : (
            <span>-</span>
          )}
        </div>
        <VscEdit className={styles.icon2} onClick={() => setShow(true)} />
      </div>
      <ModalPersonal
        show={show}
        setShow={setShow}
        personalData={personalData}
      />
    </>
  );
};

export default Personal;
