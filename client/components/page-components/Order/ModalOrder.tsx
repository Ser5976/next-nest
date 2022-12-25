import styles from './ModalOrder.module.css';
import { FC } from 'react';
import { ModalOrderProps } from './ModalOrder.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormOrder from './Form-Order/FormOrder';
import ProductsOrder from './Products/ProductsOrder';

const ModalOrder: FC<ModalOrderProps> = ({
  show,
  setShow,
  order,
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
        <ProductsOrder products={order} />
        <FormOrder setShow={setShow} order={order} />
      </div>
    </div>
  );
};

export default ModalOrder;
