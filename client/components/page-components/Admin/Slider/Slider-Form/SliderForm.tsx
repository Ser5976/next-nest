import styles from './SliderForm.module.css';
import { FC } from 'react';
import { SliderFormProps } from './SliderForm.props';
import { Controller, useForm } from 'react-hook-form';
import { InputFile } from '../../InputFile/InputFile';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';

// интерфейс формы
export interface ISliderForm {
  files: string[] | undefined;
}

const SliderForm: FC<SliderFormProps> = ({}): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос
  const queryClient = useQueryClient();
  // добавление картинки в слайдер
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: addToSlider } = useMutation(AdminService.addToSlider, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('slider');
      toast.success('Изображение добавлено ');
    },
    onError: (error: any) => {
      toast.error('Изображение не добавлено,что-то пошло не так');
    },
  });
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<ISliderForm>({
    mode: 'onChange',
  });

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
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputFile error={error} image={value} onChange={onChange} />
            )}
            rules={{
              required: 'Выберите  изображение!',
            }}
          />
        </div>

        <div className="flex justify-end">
          <input className={styles.button} type="submit" value="Добавить" />
        </div>
      </form>
    </>
  );
};

export default SliderForm;
