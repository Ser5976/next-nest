import styles from './AddArticleForm.module.css';
import { FC } from 'react';
import { AddArticleFormProps } from './AddArticleForm.props';
import { useMutation } from 'react-query';
import { AdminService, IAddArticle } from '../../../admin.service';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../../../ui/Input/Input';
import TextEditor from '../../../../../ui/Text-Editor/TextEditor';
import { stripHtml } from 'string-strip-html';

const AddArticleForm: FC<AddArticleFormProps> = ({
  setShow,
  refetch,
  article,
}): JSX.Element => {
  // добавляем статью
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: createArticle } = useMutation(AdminService.addArticle, {
    onSuccess: () => {
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
      toast.success('Статья добавлена');
      setShow(false); //закрываем модальное окно
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  //редактируем статью
  const { mutate: editArticle } = useMutation(AdminService.updateArticle, {
    onSuccess: () => {
      //  делает повторный запрос
      refetch();
      toast.success('Статья изменена');
      setShow(false); //закрываем модальное окно
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<IAddArticle>({
    mode: 'onChange',
  });

  const onSubmit = (data: IAddArticle) => {
    // console.log('article:', data);
    // если есть данные о статье значить редактируем иначе создаём статью
    if (article) {
      editArticle({ id: article._id, data });
    } else {
      createArticle(data);
    }
  };
  return (
    <div className=" py-3">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex gap-4">
          <label className="w-1/2">
            <div className={styles.label}>Заголовок</div>
            <Input
              type="text"
              className={styles.input}
              defaultValue={article ? article.title : ''}
              autoFocus
              scale="small"
              {...register('title', {
                required: 'Обязательное поле для заполнения',
              })}
              error={errors.title}
            />
          </label>
          <label className="w-1/2">
            <div className={styles.label}>Slug(для маршрутизации)</div>
            <Input
              type="text"
              placeholder="латинские символы"
              className={styles.input}
              defaultValue={article ? article.slug : ''}
              scale="small"
              {...register('slug', {
                required: 'Обязательное поле для заполнения',
                pattern: {
                  value:
                    //регулярное выражения - набор букв латиница
                    /[a-zA-Z]/,
                  message: 'Неправильный формат,только латиница',
                },
              })}
              error={errors.slug}
            />
          </label>
        </div>

        <Controller
          name="description"
          control={control}
          defaultValue={article ? article.description : ''}
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

export default AddArticleForm;
