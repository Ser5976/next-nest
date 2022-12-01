import { FC } from 'react';
import styles from './ProductCart.module.css';
import cn from 'classnames';
import { ProductCartProps } from './ProductCart.props';
import Link from 'next/link';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import { CartService, IAddCart } from '../cart.service';
import { toast } from 'react-toastify';

const ProductCart: FC<ProductCartProps> = ({ product }): JSX.Element => {
  //создаём объект товара для добавления в корзину
  const productData: IAddCart = {
    name: product.name,
    price: product.price,
    picture: product.picture,
    oldPrice: product.oldPrice,
    productId: product.productId,
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
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.picture}`}
            alt="картинка"
            unoptimized
            priority
            width={100}
            height={50}
          />
        </div>
        <Link href={`/products/productId/${product.productId}`}>
          <a className={styles.link}>{product.name}</a>
        </Link>
      </div>
      <div className={styles.wrapperQuantiti}>
        <div
          className={styles.minus}
          onClick={() => reduceQuantities(product._id)}
        >
          -
        </div>
        <div className={styles.quantiti}>{product.quantity}</div>
        <div className={styles.plus} onClick={() => addProduct(productData)}>
          +
        </div>
      </div>
      <div className={styles.wrapperPrice}>
        {product.oldPrice && (
          <span className={styles.oldPrice}>{product.totalOldPrice} p.</span>
        )}
        {'  '}
        <span className={styles.price}>{product.totalPrice}</span>
      </div>
      <div className={styles.delete} onClick={() => deleteProduct(product._id)}>
        Удалить
      </div>
    </div>
  );
};

export default ProductCart;
