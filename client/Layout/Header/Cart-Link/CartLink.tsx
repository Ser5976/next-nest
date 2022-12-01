import styles from './CartLink.module.css';
import Link from 'next/link';
import { CartLinkProps } from './CartLink.props';
import { useData } from '../../../store/useData'; //кастомных хук получение данных из стора
import { FC, useEffect, useState } from 'react';
import { BsCart } from 'react-icons/bs';
import { IUser } from '../../../store/auth/interface.auth';

export const CartLink: FC<CartLinkProps> = ({}) => {
  const { authReducer, userReducer } = useData();
  //костыль,чтобы обойти ошибку гидрации,другой способ -динамический импорт не работает
  //суть в том ,что данные на прямую из стора,через useData,рендерется и на серваке, а данных сервак не получает,
  // а клиент получает и происходит конфликт,useEffect этот вопрос решает.
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    setUser(authReducer.user);
  }, [authReducer.user]);
  return (
    <Link href={user ? '/cart' : '/auth'}>
      <a className={styles.cart}>
        Корзина
        <BsCart className={styles.cartIcon} />
        {userReducer.userProfile?.cart?.length ? (
          <span className={styles.bage}>
            {userReducer.userProfile?.cart.length}
          </span>
        ) : null}
      </a>
    </Link>
  );
};
