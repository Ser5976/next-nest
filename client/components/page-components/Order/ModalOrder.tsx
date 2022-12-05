import styles from './ModalOrder.module.css';
import { FC } from 'react';
import { ModalOrderProps } from './ModalOrder.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormOrder from './Forn-Order/FormOrder';

const ModalOrder: FC<ModalOrderProps> = ({
  show,
  setShow,
  order,
  totalPriceProduct,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Оформить заказ</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <FormOrder
          setShow={setShow}
          order={order}
          totalPriceProduct={totalPriceProduct}
        />
      </div>
    </div>
  );
};

export default ModalOrder;
