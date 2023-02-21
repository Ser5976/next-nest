import styles from './ProductForm.module.css';
import { FC } from 'react';
import { ProductFormProps } from './ProductForm.props';
import { useMutation } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { IProduct } from '../../../../Home/home.service';
import SelectForm from './Select/SelectForm';
import InputFieldsForm from './Input-Fields/InputFieldsForm';
import FileForm from './File/FileForm';
import CharacteristicForm from './Characteristic/CharacteristicForm';

// интерфейс формы
export interface IPosterForm {
  files: string[] | undefined;
}

const ProductForm: FC<ProductFormProps> = ({
  categoryProduct, // массив категорий товара (для select-form)
  productType, // массив типов товара (для select-form)
  brands, // массив брэндов товара (для select-form)
  setShow, // закрытие модального окна
  refetch, // из react-query - повторный запрос
  selectedProduct, // выбранный товар из стейта
  setSelectedProduct, // изменение выбранного товара в стейте
}): JSX.Element => {
  // создание товара
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: addProduct } = useMutation(AdminService.addProduct, {
    onSuccess: () => {
      // при успешном изменении делаем повторный запрос
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
      toast.success('товар добавлен');
      setShow(false);
    },
    onError: (error: any) => {
      toast.error('товар не создан,что-то пошло не так');
    },
  });
  // редактирование товара
  const { mutate: updateProduct } = useMutation(AdminService.updateProduct, {
    onSuccess: () => {
      // при успешном изменении делаем повторный запрос
      refetch();
      toast.success('товар изменён');
      setShow(false);
      setSelectedProduct(null);
    },
    onError: (error: any) => {
      toast.error('товар не создан,что-то пошло не так');
    },
  });
  // Так как форма получается большой, подключаем useFormContext(классная штука),
  const methods = useForm<
    Omit<IProduct, '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'>
  >({
    mode: 'onChange',
    //дефолтные значения для редактирования
    defaultValues: {
      characteristic: selectedProduct?.characteristic,
      files: selectedProduct?.files,
      categoryId: selectedProduct?.categoryId,
      typeId: selectedProduct?.typeId,
      brandId: selectedProduct?.brandId,
      name: selectedProduct?.name,
      price: selectedProduct?.price,
      oldPrice: selectedProduct?.oldPrice,
      description: selectedProduct?.description,
    },
  });
  //console.log('value:', methods.getValues('files'))

  // отправляем данные из react-hook-form при помощи react-query на бэкэнд
  const onSubmit = (
    data: Omit<IProduct, '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'>
  ) => {
    // условие  редактирование или добавление
    // в редактировании изменения цены(дела в типах, форма отпраляет string а получает number)
    if (selectedProduct) {
      const newData = { product: data, productId: selectedProduct._id };
      newData.product.price = String(newData.product.price);
      if (newData.product.oldPrice) {
        newData.product.oldPrice = String(newData.product.oldPrice);
      } else {
        newData.product.oldPrice = '';
      }
      console.log('newData:', newData);
      updateProduct(newData);
    } else {
      addProduct(data);
      console.log('Data:', data);
    }
  };
  return (
    <div className=" border-t py-3">
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Селекты */}
          <SelectForm
            categoryProduct={categoryProduct}
            brands={brands}
            productType={productType}
          />
          <div className={styles.container}>
            <div className={styles.block1}>
              {/* инпуты */}
              <InputFieldsForm />
              {/* Картинки */}
              <FileForm selectedProduct={selectedProduct} />
            </div>
            <div className={styles.block2}>
              <CharacteristicForm />
            </div>
          </div>

          <div className="flex justify-end">
            <input className={styles.button} type="submit" value="Добавить" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
