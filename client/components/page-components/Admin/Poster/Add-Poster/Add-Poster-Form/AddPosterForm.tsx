import styles from './AddPosterForm.module.css';
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AddPosterFormProps } from './AddPosterForm.props';
import { useMutation } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { InputFile } from '../../../InputFile/InputFile';

// интерфейс формы
export interface IAddPosterForm {
  files: string[] | undefined;
  productType: string;
}
//т.к. нужно валидировать массив,пришлось подключить yup
//схема валидации---------------------
const schema = yup.object().shape({
  productType: yup.string().required('Пожалуйста, выберите тип!'),
  files: yup
    .array()
    .max(1, 'Пожалуйста,выберите один файл')
    .required('Пожалуйста,выберите файл!'),
});

const AddPosterForm: FC<AddPosterFormProps> = ({
  productType,
  setShow,
  refetch,
}): JSX.Element => {
  // изменение постера
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: createPoster } = useMutation(AdminService.createPoster, {
    onSuccess: () => {
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
      toast.success('Постер добавлен');
      setShow(false); //закрываем модальное окно
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<IAddPosterForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  // этот костыль из-за проблем с ошибкой(при загрузке более одного файла мы показываем ошибку,
  // но когда удаляем лишние файлы,message не удаляется, это только с  files: yup.array() )
  const arreaFiles = watch('files');
  const isFiles = arreaFiles
    ? arreaFiles.length > 1 || arreaFiles.length < 1
    : true;

  //console.log('arr:', isFiles);

  const onSubmit = (data: IAddPosterForm) => {
    // console.log('Фото:', data);
    if (data.files) {
      createPoster({ picture: data.files[0], typeId: data.productType }); //добавляем постер
    }
  };
  console.log('errors:', errors);
  return (
    <div className=" py-3">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex justify-between">
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
          <div className="   relative mb-5 ">
            <select {...register('productType')} className={styles.select}>
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
        </div>

        <div className="flex justify-end">
          <input className={styles.button} type="submit" value="Добавить" />
        </div>
      </form>
    </div>
  );
};

export default AddPosterForm;
