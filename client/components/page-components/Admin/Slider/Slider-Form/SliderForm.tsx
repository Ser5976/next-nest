import styles from './SliderForm.module.css';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SliderFormProps } from './SliderForm.props';
import { Controller, useForm } from 'react-hook-form';
import { InputFile } from '../../InputFile/InputFile';
import { useMutation } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';

// интерфейс формы
export interface ISliderForm {
  files: string[] | undefined;
}
//т.к. нужно валидировать массив,пришлось подключить yup
//схема валидации---------------------
const schema = yup.object().shape({
  files: yup
    .array()
    .max(1, 'Пожалуйста,выберите один файл')
    .required('Пожалуйста,выберите файл!'),
});

const SliderForm: FC<SliderFormProps> = ({ refetch }): JSX.Element => {
  // добавление картинки в слайдер
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: addToSlider } = useMutation(AdminService.addToSlider, {
    onSuccess: () => {
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
      toast.success('Изображение добавлено ');
    },
    onError: (error: any) => {
      toast.error('Изображение не добавлено,что-то пошло не так');
    },
  });
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<ISliderForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  // этот костыль из-за проблем с ошибкой(при загрузке более одного файла мы показываем ошибку,
  // но когда удаляем лишние файлы,message не удаляется, это только с  files: yup.array() )
  const arreaFiles = watch('files');
  const isFiles = arreaFiles
    ? arreaFiles.length > 1 || arreaFiles.length < 1
    : true;

  const onSubmit = (data: ISliderForm) => {
    // console.log('Фото:', data);
    if (data.files) addToSlider(data.files[0]); //добавляем изображение в базу
    setValue('files', undefined); // чтобы передать undefined  в vulue для инпута
  };
  return (
    <>
      <h2 className={styles.h3}>Добавить изображение</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-5 ">
          <Controller
            name="files"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputFile
                image={value}
                onChange={onChange}
                setValue={setValue}
                name="files"
              />
            )}
          />
          {errors.files && isFiles ? (
            <span className={styles.errorMessageFiles}>
              {errors.files?.message}
            </span>
          ) : null}
        </div>

        <div className="flex justify-end">
          <input className={styles.button} type="submit" value="Добавить" />
        </div>
      </form>
    </>
  );
};

export default SliderForm;
