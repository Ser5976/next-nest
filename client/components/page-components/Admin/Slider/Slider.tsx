import styles from './Slider.module.css';
import { FC, useState } from 'react';
import { SliderProps } from './Slider.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService, ISlider } from '../admin.service';
import { toast } from 'react-toastify';
import SliderItem from './Slider-Item/SliderItem';
import SliderForm from './Slider-Form/SliderForm';

const Slider: FC<SliderProps> = ({}): JSX.Element => {
  //стэйт для слайдера
  const [images, setImages] = useState<ISlider[]>([]);
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем слайдер
  const { isLoading, refetch } = useQuery(
    'slider',
    () => AdminService.getSlider(),
    {
      onSuccess: (data) => {
        setImages(data);
      },
      onError: () => {
        toast.error('Данные не получены, попробуйте ещё раз');
      },
    }
  );
  // console.log('Стэйт:', images);
  return (
    <LayoutAdmin activeMenu="slider">
      <h1 className={styles.h1}>Слайдер</h1>
      <h3 className={styles.h3}> Установленные изображения</h3>
      {isLoading ? (
        <h2 className={styles.loading}>Загрузка...</h2>
      ) : (
        <SliderItem slider={images} refetch={refetch} />
      )}
      <SliderForm />
    </LayoutAdmin>
  );
};

export default Slider;
