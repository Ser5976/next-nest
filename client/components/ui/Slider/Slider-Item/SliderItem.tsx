import styles from './SliderItem.module.css';
import { FC } from 'react';
import { SliderItemProps } from './SliderItem.props';
import Image from 'next/image';

const SliderItem: FC<SliderItemProps> = ({ slider }): JSX.Element => {
  //console.log(slider);
  return (
    <div className={styles.slide}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
        className={styles.image}
        src={`${process.env.NEXT_PUBLIC_DOMAIN}/${slider.picture}`}
        alt="изображения нет"
        unoptimized
        priority
      />
      {slider.text && (
        <div className={styles.content}>
          <div className={styles.heading}>{slider.text}</div>
        </div>
      )}
    </div>
  );
};

export default SliderItem;