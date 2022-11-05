import { FC } from 'react';
import styles from './PopularItem.module.css';
import { PopularItemProps } from './PopularItem.props';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
//import RatingStar from '../../../../ui/Rating/RatingStar';
const RatingStar = dynamic(() => import('../../../../ui/Rating/RatingStar'), {
  ssr: false,
});

const PopularItem: FC<PopularItemProps> = ({ popular }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.picture}>
        <Image
          layout="responsive"
          objectFit="contain"
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${popular.files[0]}`}
          alt="картинка"
          unoptimized
          priority
          width={300}
          height={170}
        />
      </div>
      <div className={styles.productData}>
        <Link href={`/products/productId/${popular._id}`}>
          <a className={styles.link}>{popular.name}</a>
        </Link>

        <RatingStar rating={popular.rating} />

        <div>{popular.price} р.</div>
      </div>
    </div>
  );
};

export default PopularItem;
