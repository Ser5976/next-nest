import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './PersonalDataSkeleton.module.css';
import { PersonalDataSkeletonProps } from './PersonalDataSkeleton.props';

const PersonalDataSkeleton: FC<
  PersonalDataSkeletonProps
> = ({}): JSX.Element => {
  return (
    <div>
      <div className={styles.container}>
        <div className=" w-[5%] ">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-1">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-[100px]">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-[100px]">
          <Skeleton />
        </div>
        <div className=" w-[5%] ml-[150px]">
          <Skeleton />
        </div>
      </div>

      <div className={styles.container}>
        <div className=" w-[5%] ">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-1">
          <Skeleton />
        </div>
        <div className=" w-[5%] ml-[570px]">
          <Skeleton />
        </div>
      </div>
      <div className={styles.container}>
        <div className=" w-[5%] ">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-1">
          <Skeleton />
        </div>
        <div className=" w-[5%] ml-[570px]">
          <Skeleton />
        </div>
      </div>
      <div className={styles.container}>
        <div className=" w-[5%] ">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-1">
          <Skeleton />
        </div>
        <div className=" w-[5%] ml-[570px]">
          <Skeleton />
        </div>
      </div>
      <div className={styles.container}>
        <div className=" w-[5%] ">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-1">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-[100px]">
          <Skeleton />
        </div>
        <div className=" w-[15%] ml-[100px]">
          <Skeleton />
        </div>
        <div className=" w-[5%] ml-[150px]">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default PersonalDataSkeleton;
