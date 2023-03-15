import styles from './PersonalData.module.css';
import { FC } from 'react';
import { PersonalDataPageProps } from './PersonalDataPage.props';
import { useData } from '../../../../store/useData';
import { LayoutUser } from '../LayoutUser';
import Personal from './Personal/Personal';
import Email from './Email/Email';
import Password from './Password/Password';
import Phone from './Phone/Phone';
import Address from './Address/Address';
import PersonalDataSkeleton from './PersonalData-Skeleton/PersonalDataSkeletont';

const PersonalDataPage: FC<PersonalDataPageProps> = ({}): JSX.Element => {
  const {
    userReducer: { userProfile, isError, isLoading },
  } = useData(); //получаем из стора  все данные по юзеру при помощи кастомного хука useData()

  return (
    <LayoutUser activeMenu="personal-data">
      <h1 className="text-2xl text-gray-600 font-semibold mb-5">
        Личные данные
      </h1>
      <ul>
        {isLoading ? (
          <PersonalDataSkeleton />
        ) : isError ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Что то пошло не так!
          </h1>
        ) : (
          <>
            <Personal personalData={userProfile?.personalData} />
            <Email email={userProfile?.email} />
            <Password />
            <Phone phone={userProfile?.phone} />
            <Address address={userProfile?.address} />
          </>
        )}
      </ul>
    </LayoutUser>
  );
};

export default PersonalDataPage;
