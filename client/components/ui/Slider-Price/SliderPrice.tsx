import styles from './SliderPrice.module.css';
import { FC } from 'react';
import ReactSlider from 'react-slider';
import { SliderPriceProps } from './SliderPrice.props';

const SliderPrice: FC<SliderPriceProps> = ({
  price,
  setPrice,
}): JSX.Element => {
  return (
    <div className={styles.slider}>
      <h1 className=" text-gray-800 mb-4 text-sm font-semibold">Цена, б.р.</h1>
      <div className={styles.inputs}>
        <label>
          <span>от</span>
          <input
            type="number"
            value={price[0]}
            onChange={(e) => setPrice([Number(e.target.value), price[1]])}
          />
        </label>
        <label>
          <span>до</span>
          <input
            type="number"
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
          />
        </label>
      </div>
      <div className=" relative mx-auto">
        <ReactSlider
          value={price}
          onChange={(value, index) => {
            setPrice(value);
            // console.log(`onChange: ${JSON.stringify({ value, index })}`);
          }}
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          max={10000}
        />
      </div>
    </div>
  );
};

export default SliderPrice;
