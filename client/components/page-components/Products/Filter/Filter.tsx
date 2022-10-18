import styles from './Filter.module.css';
import { FC, useState } from 'react';
import { FilterProps } from './Flter.props';
import SliderPrice from '../../../ui/Slider-Price/SliderPrice';

const Filter: FC<FilterProps> = ({ typeName }): JSX.Element => {
  const [price, setPrice] = useState([100, 10000]);
  console.log(price);
  return (
    <div className={styles.filter}>
      <SliderPrice price={price} setPrice={setPrice} />
    </div>
  );
};

export default Filter;
