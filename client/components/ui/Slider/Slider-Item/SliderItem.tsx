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
        objectPosition="center"
        src={`${process.env.NEXT_PUBLIC_DOMAIN}/${slider.picture}`}
        alt="изображения нет"
        priority
      />
    </div>
  );
};

export default SliderItem;
