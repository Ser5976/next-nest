import { FC, useState } from 'react';
import styles from './ProductCart.module.css';
import cn from 'classnames';
import { ProductCartProps } from './ProductCart.props';
import Link from 'next/link';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import { CartService, IAddCart } from '../cart.service';
import { toast } from 'react-toastify';
import { BsCircle, BsCheck2Circle } from 'react-icons/bs';

const ProductCart: FC<ProductCartProps> = ({
  productCart,
  addOrder,
  deleteOrder,
}): JSX.Element => {
  //для изменение иконки заказа в ProductCart
  const [orderActive, setOrderActive] = useState('');
  //заказать товар
  const orderProduct = () => {
    setOrderActive(productCart._id); //изменяем иконку заказа
    addOrder(productCart); //добавляем товар из корзины в заказ
  };
  //отменить заказ
  const cancelOrder = () => {
    setOrderActive(''); //изменяем иконку заказа
    deleteOrder(productCart.productId); //удаляем товар из заказа
  };
  //создаём объект товара для добавления в корзину
  const productData: IAddCart = {
    name: productCart.name,
    price: productCart.price,
    picture: productCart.picture,
    oldPrice: productCart.oldPrice,
    productId: productCart.productId,
  };
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном delete запросе
  const queryClient = useQueryClient();
  // хук useMutation из react-query,выполняет post,put,delete запросы
  // уменьшаем количество однотипных товаров
  const { mutate: reduceQuantities } = useMutation(
    CartService.reduceQuantities,
    {
      onSuccess: () => {
        // при успешном изменении делает повторный запрос
        queryClient.invalidateQueries('cart');
      },
      onError: (error: any) => {
        toast.error('Отзыв не отправлен,что-то пошло не так');
      },
    }
  );
  //увеличиваем количество однотипных товаров
  const { mutate: addProduct } = useMutation(CartService.addCart, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('cart');
    },
    onError: (error: any) => {
      toast.error('Товар не добавлен,что-то пошло не так');
    },
  });
  //удаляем товар из корзины
  const { mutate: deleteProduct } = useMutation(
    CartService.removingProductCart,
    {
      onSuccess: () => {
        // при успешном изменении делает повторный запрос
        queryClient.invalidateQueries('user-profile');
        queryClient.invalidateQueries('cart');
      },
      onError: (error: any) => {
        toast.error('Товар не удалён из корзины,что-то пошло не так');
      },
    }
  );
  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.picture}>
          <Image
            objectFit="contain"
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${productCart.picture}`}
            alt="картинка"
            unoptimized
            priority
            width={100}
            height={50}
          />
        </div>
        <Link href={`/products/productId/${productCart.productId}`}>
          <a className={styles.link}>{productCart.name}</a>
        </Link>
      </div>
      <div className={styles.wrapperQuantiti}>
        <div
          className={styles.minus}
          onClick={() => reduceQuantities(productCart._id)}
        >
          -
        </div>
        <div className={styles.quantity}>{productCart.quantity}</div>
        <div className={styles.plus} onClick={() => addProduct(productData)}>
          +
        </div>
      </div>
      <div className={styles.wrapperPrice}>
        {productCart.oldPrice && (
          <span className={styles.oldPrice}>
            {productCart.totalOldPrice} p.
          </span>
        )}
        {'  '}
        <span className={styles.price}>{productCart.totalPrice}</span>
      </div>
      <div className={styles.order}>
        {orderActive === productCart._id ? (
          <BsCheck2Circle className={styles.icon2} onClick={cancelOrder} />
        ) : (
          <BsCircle className={styles.icon1} onClick={orderProduct} />
        )}
      </div>
      <div
        className={styles.delete}
        onClick={() => deleteProduct(productCart._id)}
      >
        Удалить
      </div>
    </div>
  );
};

export default ProductCart;
