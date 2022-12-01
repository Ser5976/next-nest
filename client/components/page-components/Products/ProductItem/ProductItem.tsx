import styles from './ProductItem.module.css';
import { FC } from 'react';
import { ProductItemProps } from './ProductItem.props';
import Image from 'next/image';
import RatingStar from '../../../ui/Rating/RatingStar';
import Link from 'next/link';
import { CartService, IAddCart } from '../../Cart/cart.service';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useData } from '../../../../store/useData';
import { useRouter } from 'next/router';

const ProductItem: FC<ProductItemProps> = ({
  product, // товар
}): JSX.Element => {
  const { authReducer } = useData();
  const router = useRouter();
  //создаём объект товара для добавления в корзину
  const productData: IAddCart = {
    name: product.name,
    price: product.price,
    picture: product.files[0],
    oldPrice: product.oldPrice,
    productId: product._id,
  };
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном delete запросе
  const queryClient = useQueryClient();
  // хук useMutation из react-query,выполняет post,put,delete запросы
  // добавляем товар в корзину
  const { mutate: addProduct } = useMutation(CartService.addCart, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('user-profile');
      toast.success('Товар добавлен в корзину');
    },
    onError: (error: any) => {
      toast.error('Товар не добавлен,что-то пошло не так');
    },
  });
  const addProductCart = () => {
    if (authReducer.user) {
      addProduct(productData);
    } else {
      router.replace(`/auth?redirect=${router.asPath}`);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <div className={styles.image}>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.files[0]}`}
            alt="изображения нет"
            unoptimized
            priority
          />
        </div>
      </div>
      <div className={styles.section2}>
        <Link href={`/products/productId/${product._id}`}>
          <a className={styles.name}>{product.name}</a>
        </Link>

        <div className={styles.description}>{product.description}</div>
      </div>
      <div className={styles.section3}>
        <div>
          {product.oldPrice && (
            <div className={styles.oldPrice}>{product.oldPrice} p.</div>
          )}

          <div className={styles.price}>{product.price} p.</div>
          <RatingStar rating={product.rating} />
          <div className={styles.cart} onClick={addProductCart}>
            В корзину
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
