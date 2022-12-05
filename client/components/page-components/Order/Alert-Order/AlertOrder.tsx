import styles from './AlertOrder.module.css';
import { FC } from 'react';
import { AlertOrderProps } from './AlertOreder.props';
import { LayoutUser } from '../../User/LayoutUser';

const AlertOrder: FC<AlertOrderProps> = ({}): JSX.Element => {
  return (
    <LayoutUser>
      <h1 className=" text-center text-2xl text-green-600 font-semibold mt-20">
        Ваш заказ принят!
      </h1>
    </LayoutUser>
  );
};

export default AlertOrder;
