import styles from './Home.module.css';
import { FC } from 'react';
import { HomeProps } from './Home.props';
import News from './News/News';
import Reviews from './Reviews/Reviews';
import Slider from '../../ui/Slider/Slider';
import ProductPopular from './Product-Popular/ProductPopular';
import { useRouter } from 'next/router';

const Home: FC<HomeProps> = ({
  news,
  reviews,
  sliders,
  popular,
}): JSX.Element => {
  // console.log(sliders);
  const { query, push } = useRouter();
  console.log('Home query:', query);
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <Slider sliders={sliders} />
        <div className=" mt-7">
          <ProductPopular popular={popular} />
        </div>
      </div>
      <div className={styles.section2}>
        <News news={news} />
        <Reviews reviews={reviews} />
        <button
          onClick={() => {
            push(
              '/?проц/propety=черный&проц/propety=белый&сис/property=wind&сис/property=lin'
            );
          }}
        >
          Нажать
        </button>
      </div>
    </div>
  );
};

export default Home;
