import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosProtected from '../custom-axios/axiox-interceptors';
import { NextPageAuth } from '../providers/auth/auth.types';
import { useData } from '../store/useData';

const Abaut: NextPageAuth = () => {
  const router = useRouter();
  const { authReducer } = useData();
  console.log(authReducer.user?._id);
  const [stat, setStat] = useState(null);
  const ordet = async () => {
    try {
      const response: any = await axiosProtected.get(
        'http://localhost:5555/api/order'
      );
      console.log(response);
      setStat(response?.data[0]?.name);
    } catch (error) {
      console.log('ошибка abaut');
      // router.push('/auth');
    }
  };
  useEffect(() => {
    ordet();
  }, []);

  return (
    <div>
      <div className="text-lg font-bold mx-auto my-10">Проверка </div>
      <div> Категория:{stat}</div>
    </div>
  );
};
Abaut.isOnlyUser = true;
export default Abaut;
