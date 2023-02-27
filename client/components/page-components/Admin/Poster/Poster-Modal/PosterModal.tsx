import styles from './PosterModal.module.css';
import { FC } from 'react';
import { PosterModalProps } from './PosterModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import PosterForm from './Poster-Form/PosterForm';
import Image from 'next/image';

const PosterModal: FC<PosterModalProps> = ({
  show, //открытие модального окна
  setShow, //закрытие модального окна
  poster, // данные постера
  refetch, ////делает повторный запрос в useQuery
}): JSX.Element | null => {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  if (!show) return null;

  // console.log('poster:', poster);
  return (
    <div className={styles.container} id="container" onClick={handleOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Изменить постер</h1>
        <TiDeleteOutline
          className={styles.icon}
          onClick={() => setShow(false)}
        />
        <h3 className={styles.h3}> Установленный постер</h3>
        <Image
          objectFit="contain"
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${poster.picture}`}
          alt="картинка"
          objectPosition="center"
          unoptimized
          priority
          width={150}
          height={125}
        />
        <PosterForm poster={poster} refetch={refetch} />
      </div>
    </div>
  );
};

export default PosterModal;
