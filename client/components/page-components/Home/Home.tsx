import styles from './Home.module.css';
import { FC } from 'react';
import { HomeProps } from './Home.props';
import News from './News/News';

const Home: FC<HomeProps> = ({ news }): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <div className=" h-80 relative mb-10">
          слайдер
          <div className=" absolute left-0 top-0 w-full h-full  bg-lime-400 opacity-25"></div>
        </div>
        <div className=" h-96 border w-full">Популярные</div>
      </div>
      <div className={styles.section2}>
        <News news={news} />
        <div className=" w-full border h-96 ">отзывы</div>
      </div>
    </div>
  );
};

export default Home;
