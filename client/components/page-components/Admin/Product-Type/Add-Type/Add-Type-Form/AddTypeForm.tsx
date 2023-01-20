import styles from './AddTypeForm.module.css';
import { FC } from 'react';
import { AddTypeFormProps } from './AddTypeForm.props';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../../ui/Input/Input';

const AddTypeForm: FC<AddTypeFormProps> = ({ setShow }): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();
  // добавляем тип
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: addType } = useMutation(AdminService.addProductType, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('product type');
      toast.success('Тип добавлен');
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
    addType(data);
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

export default AddTypeForm;
