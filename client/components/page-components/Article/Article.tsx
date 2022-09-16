import { ArticleProps } from './Article.props';
import styles from './Article.module.css';
import cn from 'classnames';
import { FC } from 'react';
import Link from 'next/link';

const Article: FC<ArticleProps> = ({ article, forCustomers }): JSX.Element => {
  return (
    <>
      <main className={styles.wrapper}>
        <section className={styles.customers}>
          <h1 className=" text-base text-gray-600  font-semibold my-5">
            Покупателям
          </h1>
          <ul>
            {forCustomers.map((link) => {
              return (
                <Link href={link.slug} key={link._id}>
                  <a
                    className={cn({
                      [styles.link]: article.slug !== link.slug,
                      [styles.active]: article.slug === link.slug,
                    })}
                  >
                    {link.title}
                  </a>
                </Link>
              );
            })}
          </ul>
        </section>
        <section className={styles.article}>
          <Link href="/">
            <a className=" text-sm text-gray-600 underline hover:text-red-400   ">
              Главная
            </a>
          </Link>
          <h1 className=" text-2xl text-gray-600  font-semibold my-5 ">
            {article.title}
          </h1>
          <div>{article.description}</div>
        </section>
      </main>
    </>
  );
};

export default Article;
