import styles from './ProductItem.module.css';
import { FC, useState } from 'react';
import { ProductItemProps } from './ProductItem.props';
import Image from 'next/image';
import RatingStar from '../../../ui/Rating/RatingStar';

const ProductItem: FC<ProductItemProps> = ({
  product, // товар
}): JSX.Element => {
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
          />
        </div>
      </div>
      <div className={styles.section2}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.description}>{product.description}</div>
      </div>
      <div className={styles.section3}>
        <div>
          {product.oldPrice && (
            <div className={styles.oldPrice}>{product.oldPrice} p.</div>
          )}

          <div className={styles.price}>{product.price} p.</div>
          <RatingStar rating={product.rating} />
          <div className={styles.cart}>В корзину</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
