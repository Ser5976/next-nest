import cn from 'classnames';
import styles from './Header.module.css';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { SiScrollreveal } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';
import { MdExitToApp } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { CatalogMenu } from './CatalogMenu/CatalogMenu';
import { HeaderProps } from './Header.props';
import { useClickOutside } from '../../hook/clickOutside';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { ref, isShow, setIsShow } = useClickOutside(true); //кастомный хук (используем для закрытия dropdown по клику снаружи)
  const catalogRef = ref;

  const auth = false;
  const showAccount = false;

  return (
    <>
      <header className={cn(className, styles.header)} {...props}>
        <ul className={styles.header1}>
          <Link href="#">
            <a>Доставка</a>
          </Link>
          <Link href="#">
            <a>Оплата</a>
          </Link>
          <Link href="#">
            <a>О нас</a>
          </Link>
          <Link href="#">
            <a>Контакты</a>
          </Link>
        </ul>
        <div className={styles.header2}>
          <button className={styles.logo}>TrainingProject</button>
          <div className={styles.catalog}>
            <button ref={catalogRef} onClick={() => setIsShow(!isShow)}>
              Каталог товаров
            </button>
            <span>{isShow ? <SiScrollreveal /> : <AiOutlineClose />}</span>
          </div>
          <div className={styles.search}>
            <input
              type="text"
              className={styles.input}
              placeholder="Поиск товаров . . ."
            />
            <button className={styles.searchButton}>
              <AiOutlineSearch />
            </button>
          </div>
          <div className={styles.account}>
            <button className={styles.accountButton}>Аккаунт</button>
            {auth ? (
              <VscAccount className={styles.icons1} />
            ) : (
              <MdExitToApp className={styles.icons1} />
            )}
            {showAccount ? (
              <IoMdArrowDropup className={styles.icons2} />
            ) : (
              <IoMdArrowDropdown className={styles.icons2} />
            )}
          </div>

          <button>5</button>
        </div>
        <div className="   bg-gradient-to-l from-lime-400 via-amber-400 to-red-400">
          <ul className=" flex   justify-center text-white text-base items-center ">
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5 truncate max-w-[200px]">
                Холодильникииииииии
              </a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Смартфоны</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Матрасы</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Кондиционеры</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Микроволновки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Ноутбуки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Стиралки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Морозилки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Кофеварки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Мультиварки</a>
            </Link>
          </ul>
        </div>
      </header>

      <div className=" relative">
        <CatalogMenu showCatalog={isShow} />
      </div>
    </>
  );
};
