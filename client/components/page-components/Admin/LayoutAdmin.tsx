import { LayoutAdminProps } from './LayoutAdmin.props';
import styles from './LayoutAdmin.module.css';
import Menu from './Menu/Menu';

// это компонент, как оболочка для каждой страницы,позволяет нам удобно добавлять Menu в каждую страницу
export const LayoutAdmin = ({
  children, //вложенная страница
  activeMenu, //флаг для кажной страници
}: LayoutAdminProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Menu activeMenu={activeMenu} />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
