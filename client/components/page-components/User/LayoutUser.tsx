import { LayoutUserProps } from './LayoutUser.props';
import styles from './LayoutUser.module.css';
import Menu from './Menu/Menu';

export const LayoutUser = ({
  children,
  activeMenu,
}: LayoutUserProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Menu activeMenu={activeMenu} />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
