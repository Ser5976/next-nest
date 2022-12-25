import styles from './OrderModal.module.css';
import { FC } from 'react';
import { OrderModalProps } from './OrderModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import FormOrder from './Order-Form/OrderForm';
import ProductsOrder from './Products-order/ProductsOrder';

const OrderModal: FC<OrderModalProps> = ({
  show,
  setShow,
  order,
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  console.log('order:', order);
  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Заказ № {order._id}</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <ProductsOrder products={order.productCart} />
        <FormOrder order={order} />
      </div>
    </div>
  );
};

export default OrderModal;
