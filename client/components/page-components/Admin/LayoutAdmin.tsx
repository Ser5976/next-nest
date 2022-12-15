import { LayoutAdminProps } from './LayoutAdmin.props';
import styles from './LayoutAdmin.module.css';
import Menu from './Menu/Menu';

export const LayoutAdmin = ({
  children,
  activeMenu,
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
