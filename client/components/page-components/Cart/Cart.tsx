import styles from './Cart.module.css';
import { FC, useState } from 'react';
import { CartProps } from './Cart.props';
import { LayoutUser } from '../User/LayoutUser';
import { useQuery } from 'react-query';
import { CartService, ICart } from './cart.service';
import ProductCart from './Product-Cart/ProductCart';
import cn from 'classnames';
import ModalOrder from '../Order/ModalOrder';

const Cart: FC<CartProps> = ({}): JSX.Element => {
  //открытие модального окна для оформление заказа
  const [show, setShow] = useState(false);
  //стейт для выбранного заказа
  const [order, setOrder] = useState<ICart[]>([]);
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  //получаем  все данные (из базы) по корзине
  const {
    data: basketData,
    isLoading,
    isError,
  } = useQuery('cart', () => CartService.getCart());
  // console.log(basketData);

  //добавляем выбранный товар из корзины в заказ
  const addOrder = (productCart: ICart) => {
    //добавляем товар из корзины в  стейт заказа преворительно удалив однотипный
    setOrder([...order,productCart]); 
  };
  //удаляем выбранный товар  из заказа
  const deleteOrder = (productCartId: string) => {
    const newOrder = order.filter(el => el.productId !== productCartId);
    setOrder(newOrder);
  };
  // console.log(order);
  return (
    <LayoutUser activeMenu="cart">
      <h1 className={styles.h1}>Корзина</h1>
      <div className={styles.wrapper}>
        <div className={styles.label}>
          <div className={styles.product}>Товар</div>
          <div className={styles.quantiti}>Количество</div>
          <div className={styles.price}>Стоимость</div>
          <div className={styles.order}>Заказать</div>
        </div>
        <ul>
          {isError ? (
            <h3 className={styles.error}>Что то пошло не так!</h3>
          ) : isLoading ? (
            <h3 className={styles.h3}>Загрузка...</h3>
          ) : basketData?.cart.length === 0 ? (
            <h3 className={styles.h3}>Товаров в корзине нет!</h3>
          ) : (
            <div>
              {basketData?.cart.map((productCart) => {
                return (
                  <ProductCart
                    key={productCart._id}
                    productCart={productCart}
                    addOrder={addOrder}
                    deleteOrder={deleteOrder}
                  />
                );
              })}
            </div>
          )}
        </ul>
        <div className={styles.totalPrice}>
          Общая стоимость: <span>{basketData?.totalPriceProduct} р.</span>
        </div>
        <div className={styles.wrapperButton}>
          <button
            className={cn(styles.button, {
              [styles.disabledButton]: order.length === 0,
            })}
            disabled={order.length === 0}
            onClick={() => setShow(true)}
          >
            Оформить заказ
          </button>
        </div>
      </div>
      <ModalOrder order={order} setShow={setShow} show={show} />
    </LayoutUser>
  );
};

export default Cart;
