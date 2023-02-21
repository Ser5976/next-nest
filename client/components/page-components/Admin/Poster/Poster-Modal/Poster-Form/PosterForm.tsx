import styles from './PosterForm.module.css';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PosterFormProps } from './PosterForm.props';
import { useMutation } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { InputFile } from '../../../InputFile/InputFile';

// интерфейс формы
export interface IPosterForm {
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

const PosterForm: FC<PosterFormProps> = ({ poster, refetch }): JSX.Element => {
  // изменение постера
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: updatePoster } = useMutation(AdminService.updatePoster, {
    onSuccess: (updatePoster) => {
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
      toast.success(updatePoster.message);
      removeUrl(poster.picture); //если изменение постера произошло успешно ,удаляем старую фотку из папки uploads
      setValue('files', undefined); // чтобы передать undefined  в vulue для инпута
    },
    onError: (error: any) => {
      toast.error('постер не изменён,что-то пошло не так');
    },
  });
  //удаление url изображения из папки uploads
  const { mutate: removeUrl } = useMutation(AdminService.removeUrl, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      toast.success('файл удалён из папки uploads ');
    },
    onError: (error: any) => {
      toast.error('файл не удалён,что-то пошло не так');
    },
  });

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<IPosterForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  // этот костыль из-за проблем с ошибкой(при загрузке более одного файла мы показываем ошибку,
  // но когда удаляем лишние файлы,message не удаляется, это только с  files: yup.array() )
  const arreaFiles = watch('files');
  const isFiles = arreaFiles
    ? arreaFiles.length > 1 || arreaFiles.length < 1
    : true;

  const onSubmit = (data: IPosterForm) => {
    if (data.files) {
      updatePoster({ picture: data.files[0], posterId: poster._id }); //изменяем постер
    }
  };

  return (
    <div className=" border-t py-3">
      <h2 className={styles.h2}>Изменить постер</h2>
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
    </div>
  );
};

export default PosterForm;
