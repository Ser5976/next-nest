import styles from './Cart.module.css';
import { FC } from 'react';
import { CartProps } from './Cart.props';
import { LayoutUser } from '../User/LayoutUser';
import { useQuery } from 'react-query';
import { CartService } from './cart.service';
import { Button } from '../../ui/Button/Button';
import ProductCart from './Product-Cart/ProductCart';

const Cart: FC<CartProps> = ({}): JSX.Element => {
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  //получаем  все данные (из базы) по юзеру и записываем их в стор(редакс)
  const {
    data: basketData,
    isLoading,
    isError,
  } = useQuery('cart', () => CartService.getCart());
  console.log(basketData);

  return (
    <LayoutUser activeMenu="cart">
      <h1 className={styles.h1}>Корзина</h1>
      <div className={styles.wrapper}>
        <div className={styles.label}>
          <div className={styles.product}>Товар</div>
          <div className={styles.quantiti}>Количество</div>
          <div className={styles.price}>Стоимость</div>
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
              {basketData?.cart.map((product) => {
                return <ProductCart key={product._id} product={product} />;
              })}
            </div>
          )}
        </ul>
        <div className={styles.totalPrice}>
          Общая стоимость: <span>{basketData?.totalPriceProduct} р.</span>
        </div>
        <div className={styles.wrapperButton}>
          <Button apperance="small" className={styles.button}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Cart;
