import styles from './AddPosterForm.module.css';
import { FC } from 'react';
import { AddPosterFormProps } from './AddPosterForm.props';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { InputFile } from '../../../InputFile/InputFile';

// интерфейс формы
export interface IAddPosterForm {
  files: string[] | undefined;
  productType: string;
}

const AddPosterForm: FC<AddPosterFormProps> = ({
  productType,
}): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();
  // изменение постера
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: createPoster } = useMutation(AdminService.createPoster, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('poster');
      setValue('files', undefined); // чтобы передать undefined  в vulue для инпута
      setValue('productType', ''); // чтобы сбросить тип в селекте
      toast.success('Постер добавлен');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<IAddPosterForm>({
    mode: 'onChange',
  });

  const onSubmit = (data: IAddPosterForm) => {
    // console.log('Фото:', data);
    if (data.files) {
      createPoster({ picture: data.files[0], typeId: data.productType }); //добавляем постер
    }
  };
  return (
    <div className=" py-3">
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
        <div className="   relative mb-5 ">
          <select
            {...register('productType', {
              required: 'Выберите тип!',
            })}
            className={styles.select}
            defaultValue=""
          >
            <option value="" className=" text-gray-400">
              Выберите тип
            </option>
            {productType.map((type) => {
              return (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              );
            })}
          </select>
          {errors.productType && (
            <span className={styles.errorMessage}>
              {errors.productType?.message}
            </span>
          )}
        </div>
        <div className="flex justify-end">
          <input className={styles.button} type="submit" value="Добавить" />
        </div>
      </form>
    </div>
  );
};

export default AddPosterForm;
