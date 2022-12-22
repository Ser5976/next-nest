import { FC } from 'react';
import styles from './ProductsOrder.module.css';
import { ProductsOrderProps } from './ProductsOrder.props';
import Link from 'next/link';
import Image from 'next/image';

const ProductsOrder: FC<ProductsOrderProps> = ({ products }): JSX.Element => {
  // console.log('product', products);
  return (
    <>
      <h2 className={styles.h2}>Заказанные товары</h2>
      <label className={styles.lableWrapper}>
        <div className={styles.lableProduct}>Товар</div>
        <div className={styles.lableQuantity}>Количества</div>
        <div className={styles.lablePrice}>Цена</div>
      </label>
      <div className={styles.containerOrder}>
        {products?.map((product) => {
          return (
            <div className={styles.container} key={product._id}>
              <div className={styles.wrapperProduct}>
                <div className={styles.product}>
                  <div className={styles.picture}>
                    <Image
                      objectFit="contain"
                      src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.picture}`}
                      alt="картинка"
                      unoptimized
                      priority
                      width={75}
                      height={25}
                    />
                  </div>
                  <Link href={`/products/productId/${product.productId}`}>
                    <a className={styles.link}>{product.name}</a>
                  </Link>
                </div>
              </div>
              <div className={styles.wrapperQuantiti}>
                <div className={styles.quantity}>{product.quantity}</div>
              </div>
              <div className={styles.wrapperPrice}>
                <div className={styles.price}>{product.totalPrice}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductsOrder;
