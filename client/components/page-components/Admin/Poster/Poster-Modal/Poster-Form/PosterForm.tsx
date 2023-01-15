import styles from './PosterForm.module.css';
import { FC } from 'react';
import { PosterFormProps } from './PosterForm.props';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { InputFile } from '../../../InputFile/InputFile';

// интерфейс формы
export interface IPosterForm {
  files: string[] | undefined;
}

const PosterForm: FC<PosterFormProps> = ({ poster }): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();
  // изменение постера
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: updatePoster } = useMutation(AdminService.updatePoster, {
    onSuccess: (updatePoster) => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('poster');
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

  const { handleSubmit, setValue, control } = useForm<IPosterForm>({
    mode: 'onChange',
  });

  const onSubmit = (data: IPosterForm) => {
    // console.log('Фото:', data);
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
    </div>
  );
};

export default PosterForm;
