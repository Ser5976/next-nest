import styles from './ProductPage.module.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import { ProductPageProps } from './ProductPage.props';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';
import RatingStar from '../../ui/Rating/RatingStar';
import Image from 'next/image';
import { Button } from '../../ui/Button/Button';
import Tabs from './Tabs/Tabs';
import { useData } from '../../../store/useData';
import Favourites from './Favourites/Favourites';

const ProductPage: FC<ProductPageProps> = ({
  product,
  productType,
}): JSX.Element => {
  //активный класс для картинок
  const [index, setIndex] = useState(0);
  //определяем имя типа товара для навигации
  const typeName = productType?.find((el) => el._id === product.typeId);

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/">
          <a>Главная</a>
        </Link>
        <HiOutlineChevronRight className={styles.icons} />
        <Link href={`/products/${typeName?._id}`}>
          <a>{typeName?.name}</a>
        </Link>
      </div>
      <h1 className={styles.name}>{product.name}</h1>
      <div className={styles.ratingStar}>
        <RatingStar rating={product.rating} size="large" />
        <Favourites product={product} />
      </div>

      <div className={styles.main}>
        <div className={styles.section1}>
          {product.files.map((f, i) => {
            return (
              <div
                key={f}
                className={cn(styles.arrayImg, {
                  [styles.active]: i === index,
                })}
                onClick={() => setIndex(i)}
              >
                <Image
                  objectFit="contain"
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${f}`}
                  alt="картинка"
                  unoptimized
                  priority
                  width={50}
                  height={50}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.section2}>
          <div className={styles.img}>
            <Image
              layout="responsive"
              objectFit="contain"
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.files[index]}`}
              alt="картинка"
              unoptimized
              priority
              width={50}
              height={50}
            />
          </div>
        </div>

        <div className={styles.section3}>
          <div className=" w-1/2">
            {product.oldPrice && (
              <div className={styles.oldPrice}>{product.oldPrice} p.</div>
            )}
            <div className={styles.price}>{product.price} p.</div>
            <Button className={styles.cart}>В корзину</Button>
          </div>
        </div>
      </div>
      <Tabs product={product} />
    </div>
  );
};

export default ProductPage;
