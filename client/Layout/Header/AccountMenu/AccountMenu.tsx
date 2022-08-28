import cn from 'classnames';
import styles from './AccountMenu.module.css';
import Link from 'next/link';
import { AccountMenuProps } from './AccountMenu.props';
import { useClickOutside } from '../../../hook/clickOutside';
import { MdExitToApp } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { ImExit } from 'react-icons/im';
import { VscEye } from 'react-icons/vsc';
import { VscFeedback } from 'react-icons/vsc';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { logout } from '../../../store/auth/authActoins';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { useState } from 'react';

export const AccountMenu = ({
  className,
  ...props
}: AccountMenuProps): JSX.Element => {
  const { ref, isShow, setIsShow } = useClickOutside(true); //кастомный хук (используем для закрытия
  //dropdown по клику снаружи)
  const [auth, setAuth] = useState(true);
  const count = 5;
  const dispatch = useDispatch<AppDispatch>();
  const exit = async () => {
    await dispatch(logout());
    setAuth(false);
    setIsShow(false);
  };
  return (
    <>
      <button
        className={cn(className, styles.account)}
        ref={ref}
        onClick={() => setIsShow(!isShow)}
        {...props}
      >
        {auth ? (
          <BsPerson className={styles.icons1} />
        ) : (
          <MdExitToApp className={styles.icons1} />
        )}
        {isShow ? (
          <IoMdArrowDropup className={styles.icons2} />
        ) : (
          <IoMdArrowDropdown className={styles.icons2} />
        )}
        Аккаунт
      </button>

      {/* меню список */}
      <div className={cn(styles.show, { [styles.hidden]: isShow })}>
        {auth ? (
          <div className="  h-[270px] w-[250px] ">
            <div className=" text-center text-lg text-gray-600 font-medium mt-3">
              Аккаунт
            </div>
            <div className=" text-center text-xs text-gray-500">
              gray050976@mail.ru
            </div>
            <div className="px-5 m-3 bg-transparent border-b"></div>
            <ul>
              <Link href="#">
                <a className={styles.link}>
                  <MdOutlineFavoriteBorder className={styles.favourites} />
                  {count >= 1 ? (
                    <span className={styles.bage}>{count}</span>
                  ) : null}
                  Избранные товары
                </a>
              </Link>
              <Link href="#">
                <a className={styles.link}>
                  <VscEye className={styles.favourites} />
                  {count >= 1 ? (
                    <span className={styles.bage}>{count}</span>
                  ) : null}
                  Просмотренные
                </a>
              </Link>
              <Link href="#">
                <a className={styles.link}>
                  <VscFeedback className={styles.favourites} />
                  {count >= 1 ? (
                    <span className={styles.bage}>{count}</span>
                  ) : null}
                  Отзывы
                </a>
              </Link>
              <Link href="#">
                <a className={styles.link}>
                  <BsPerson className={styles.favourites} />
                  Личные данные
                </a>
              </Link>
            </ul>
            <div className="px-5 m-3 bg-transparent border-b"></div>
            <button
              className=" relative pl-8 hover:bg-red-50 w-full flex justify-start text-red-400 py-1"
              onClick={exit}
            >
              <ImExit className=" absolute top-2.5 left-3 fill-red-400 " />
              Выход
            </button>
          </div>
        ) : (
          <div className=" flex flex-col py-5 w-[250px] items-center">
            <BsPersonFill className=" w-[30px] h-[30px] top-0 right-0 fill-gray-400 mb-3" />
            <Link href="/auth">
              <a className={styles.entry}>Вход</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
