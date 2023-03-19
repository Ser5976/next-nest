import styles from './SliderItem.module.css';
import { FC } from 'react';
import { SliderItemProps } from './SliderItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import Image from 'next/image';

const SliderItem: FC<SliderItemProps> = ({
  slider, //масссив данных слайдера
  refetch, //делает повторный запрос в useQuery
}): JSX.Element => {
  // console.log('sliderItem:', slider);
  // удаление изображения(url из базы)
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteImage } = useMutation(AdminService.deleteImage, {
    onSuccess: () => {
      // делаем повторный запрос useQuery
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
    },
    onError: (error: any) => {
      toast.error('Изображение  не удалёно,что-то пошло не так');
    },
  });
  // удаление изображения (url из папки uploads)
  const { mutate: removeUrl } = useMutation(AdminService.removeUrl, {
    onSuccess: () => {
      toast.success('Изображение удалено из папки uploads ');
    },
    onError: (error: any) => {
      toast.error('Изображение  не удалёно,что-то пошло не так');
    },
  });
  // запуск удаление изабражения из базы и папки uploads
  const startDeleteImage = (imgId: string, url: string) => {
    // удаление изображения(url из базы)
    deleteImage(imgId);
    // удаление изображения (url из папки uploads)
    removeUrl(url);
  };

  return (
    <>
      {slider?.length === 0 ? (
        <h3 className={styles.h3}>Слайдер пустой!</h3>
      ) : (
        <div className={styles.container}>
          {slider?.map((image) => {
            return (
              <div key={image._id} className={styles.wrapperImage}>
                <Image
                  objectFit="contain"
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image.picture}`}
                  alt="картинка"
                  unoptimized
                  priority
                  width={100}
                  height={75}
                />
                <TiDeleteOutline
                  className={styles.icon}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Вы действительно хотите удалить это изображение из слайдера`
                      )
                    ) {
                      startDeleteImage(image._id, image.picture);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SliderItem;
