import styles from './Admin.module.css';
import { FC } from 'react';
import { AdminProps } from './Admin.props';
import { useData } from '../../../store/useData';
import { LayoutUser } from '../User/LayoutUser';

const Admin: FC<AdminProps> = ({}): JSX.Element => {
  return (
    <LayoutUser activeMenu="admin-panel">
      <h1 className="text-2xl text-gray-600 font-semibold mb-5">
        Панель администратора
      </h1>
      <ul></ul>
    </LayoutUser>
  );
};

export default Admin;
