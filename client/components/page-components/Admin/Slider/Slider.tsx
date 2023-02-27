import styles from './Slider.module.css';
import { FC, useEffect } from 'react';
import { SliderProps } from './Slider.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import SliderItem from './Slider-Item/SliderItem';
import SliderForm from './Slider-Form/SliderForm';

const Slider: FC<SliderProps> = ({}): JSX.Element => {
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  //получаем слайдер
  const {
    isLoading,
    refetch,
    data: sliderImages,
  } = useQuery('slider', () => AdminService.getSlider(), {
    onError: () => {
      toast.error('Данные не получены, попробуйте ещё раз');
    },
    enabled: false,
  });
  // это костыль для перезапуска useQuery,
  // при удалении из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log('рендеринг');
  return (
    <LayoutAdmin activeMenu="slider">
      <h1 className={styles.h1}>Слайдер</h1>
      <h3 className={styles.h3}> Установленные изображения</h3>
      {isLoading ? (
        <h2 className={styles.loading}>Загрузка...</h2>
      ) : (
        <SliderItem slider={sliderImages} refetch={refetch} />
      )}
      <SliderForm refetch={refetch} />
    </LayoutAdmin>
  );
};

export default Slider;
