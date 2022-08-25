import { FC, ReactNode } from 'react';
import Toast from './toast/Toast';

export interface MainPrviderProps {
  children: ReactNode;
}

const MainProvider: FC<MainPrviderProps> = ({ children }) => {
  return (
    <>
      <Toast />
      {children}
    </>
  );
};

export default MainProvider;
