import styles from './AddCategoryForm.module.css';
import { FC } from 'react';
import { AddCategoryFormProps } from './AddCategoryForm.props';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../../ui/Input/Input';

const AddCategoryForm: FC<AddCategoryFormProps> = ({}): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();
  // изменение постера
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: addCategory } = useMutation(AdminService.addCategoryProduct, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('category product');
      toast.success('Категория добавлена');
      setValue('name', ''); // очистка инпута в react-hook-form
    },
    onError: (error: any) => {
      toast.error('категория не добавлена,чито то пошло не так');
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<{ name: string }>({
    mode: 'onChange',
  });

  const onSubmit = (data: { name: string }) => {
    addCategory(data);
  };
  return (
    <div className=" py-3">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-5 ">
          <label>
            <div className={styles.label}>Категория</div>
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

export default AddCategoryForm;
