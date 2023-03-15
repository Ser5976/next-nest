import styles from './ModalAddress.module.css';
import { FC } from 'react';
import { ModalAddressProps } from './ModalAddress.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormPersonal from './Form-Address/FormAddress';

const ModalAddress: FC<ModalAddressProps> = ({
  show, //открытие модального окна
  setShow, //закрытие модального окна
  address, //данные по адрессу
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Изменение адреса</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <FormPersonal setShow={setShow} address={address} />
      </div>
    </div>
  );
};

export default ModalAddress;
