import styles from './Address.module.css';
import { FC, useState } from 'react';
import { AddressProps } from './Address.props';
import { BsHouse } from 'react-icons/bs';
import { VscEdit } from 'react-icons/vsc';
import ModalAddress from './Modal-Address/ModalAddress';

const Address: FC<AddressProps> = ({
  address, //данне по адрессу
}): JSX.Element => {
  //открытие модального окна для редактирование имени юзера
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <BsHouse className={styles.icon1} />
        <div className={styles.label}>
          <div>Населённый пункт</div>
          {address?.city ? <span>{address.city}</span> : <span>-</span>}
        </div>
        <div className={styles.label}>
          <div>Улица</div>
          {address?.street ? <span>{address.street}</span> : <span>-</span>}
        </div>
        <div className={styles.label}>
          <div>Дом/квартира</div>
          {address?.house ? (
            <>
              <span>{address.house}</span>
              <span>{address.flat && <>/{address.flat}</>}</span>
            </>
          ) : (
            <span>-</span>
          )}
        </div>
        <VscEdit className={styles.icon2} onClick={() => setShow(true)} />
      </div>
      <ModalAddress show={show} setShow={setShow} address={address} />
    </>
  );
};

export default Address;
