import styles from './AddBrandForm.module.css';
import { FC } from 'react';
import { AddBrandFormProps } from './AddBrandForm.props';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../../ui/Input/Input';

const AddBrandForm: FC<AddBrandFormProps> = ({
  setShow, //для закрытия  модального окна
}): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();
  // добавляем тип
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: addBrand } = useMutation(AdminService.addBrand, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('brand');
      toast.success('брэнд добавлен');
      setShow(false); // закрытие модального окна
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: 'onChange',
  });

  const onSubmit = (data: { name: string }) => {
    addBrand(data);
  };
  return (
    <div className=" py-3">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-5 ">
          <label>
            <div className={styles.label}>Тип</div>
            <Input
              type="text"
              autoFocus
              className={styles.input}
              scale="small"
              {...register('name', {
                required: 'Обязательное поле для заполнения',
              })}
              error={errors.name}
            />
          </label>
        </div>
        <div className="flex justify-end">
          <input className={styles.button} type="submit" value="Добавить" />
        </div>
      </form>
    </div>
  );
};

export default AddBrandForm;
