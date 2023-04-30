import styles from './AddNewsForm.module.css';
import { FC } from 'react';
import { AddNewsFormProps } from './AddANewsForm.props';
import { useMutation } from 'react-query';
import { AdminService, IAddNews } from '../../../admin.service';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../../../ui/Input/Input';
import TextEditor from '../../../../../ui/Text-Editor/TextEditor';
import { stripHtml } from 'string-strip-html';

const AddNewsForm: FC<AddNewsFormProps> = ({
  setShow, //закрыть модального окна
  refetch, // делает повторный запрос в useQuery
  selectedNews,
}): JSX.Element => {
  // добавляем новость
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: createNews } = useMutation(AdminService.addNews, {
    onSuccess: () => {
      //  делает повторный запрос
      refetch();
      toast.success('Новость добавлена');
      setShow(false); //закрываем модальное окно
    },
    onError: (error: any) => {
      //здесь показываем ошибку только когда это не 'Unauthorized',
      //при 'Unauthorized' отработает AuthProvider
      if(error.response.data.message !== 'Unauthorized'){
        setShow(false)
        toast.error('Что то пошло не так')
      }
      
    },
  });
  //редактируем новость
  const { mutate: editNews } = useMutation(AdminService.updateNews, {
    onSuccess: () => {
      //  делает повторный запрос
      refetch();
      toast.success('Новость изменена');
      setShow(false); //закрываем модальное окно
    },
    onError: (error: any) => {
      if(error.response.data.message !== 'Unauthorized'){
        setShow(false)
        toast.error('Что то пошло не так')
      }
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<IAddNews>({
    mode: 'onChange',
  });

  const onSubmit = (data: IAddNews) => {
    // console.log('article:', data);
    // если есть данные о статье значить редактируем иначе создаём статью
    if (selectedNews) {
      editNews({ id: selectedNews._id, data });
    } else {
      createNews(data);
    }
  };
  return (
    <div className=" py-3">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <div className={styles.label}>Заголовок</div>
            <Input
              type="text"
              className={styles.input}
              defaultValue={selectedNews ? selectedNews.name : ''}
              autoFocus
              scale="small"
              {...register('name', {
                required: 'Обязательное поле для заполнения',
              })}
              error={errors.name}
            />
          </label>
        </div>

        <Controller
          name="text"
          control={control}
          defaultValue={selectedNews ? selectedNews.text : ''}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextEditor
              placeholder="Текст"
              onChange={onChange}
              error={error}
              value={value}
            />
          )}
          rules={{
            validate: {
              required: (v) =>
                (v && stripHtml(v).result.length > 0) || 'Введите текст!',
            },
          }}
        />

        <div className="flex justify-end">
          <input className={styles.button} type="submit" value="Добавить" />
        </div>
      </form>
    </div>
  );
};

export default AddNewsForm;
