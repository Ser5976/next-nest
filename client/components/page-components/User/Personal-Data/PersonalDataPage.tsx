import styles from './PersonalData.module.css';
import { FC } from 'react';
import { PersonalDataPageProps } from './PersonalDataPage.props';
import { useData } from '../../../../store/useData';
import { LayoutUser } from '../LayoutUser';
import Personal from './Personal/Personal';
import Email from './Email/Email';

const PersonalDataPage: FC<PersonalDataPageProps> = ({}): JSX.Element => {
  const { userReducer } = useData(); //получаем из стора  все данные по юзеру при помощи кастомного хука useData()
  const { userProfile, isError } = userReducer;

  return (
    <LayoutUser activeMenu="personal-data">
      <h1 className="text-2xl text-gray-600 font-semibold mb-5">
        Личные данные
      </h1>
      <ul>
        {isError ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Что то пошло не так!
          </h1>
        ) : (
          <>
            <Personal personalData={userProfile?.personalData} />
            <Email email={userProfile?.email} />
          </>
        )}
      </ul>
    </LayoutUser>
  );
};

export default PersonalDataPage;
