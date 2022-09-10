import { ArticleProps } from './Article.props';
import styles from './Article.module.css';
import cn from 'classnames';
import { FC } from 'react';

const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <main className={styles.wrapper}>
      <section className={styles.customers}>
        <h1 className="font-semibold my-5">Покупателям</h1>
      </section>
      <section className={styles.article}>
        <h1 className=" text-xl font-semibold  my-5">{article.title}</h1>
        <div>{article.description}</div>
      </section>
    </main>
  );
};

export default Article;
