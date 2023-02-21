import { FC } from 'react';
import { FileFormProps } from './FileForm.props';
import { Controller, useFormContext } from 'react-hook-form';
import { IProduct } from '../../../../../Home/home.service';
import { InputFile } from '../../../../InputFile/InputFile';

const FileForm: FC<FileFormProps> = ({
  selectedProduct, // данные по выбранному товару для редактирования
}): JSX.Element => {
  const { control, setValue, getValues } =
    useFormContext<
      Omit<IProduct, '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'>
    >();
  // это маркер дефолтного состояния InputFile должен знать это редактирование или добавление файла
  const isEditing = !!selectedProduct?.files;

  console.log('getValues:', getValues('files'));

  return (
    <div className="relative mb-5 ">
      <Controller
        name="files"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <InputFile
            error={error}
            image={value}
            onChange={onChange}
            setValue={setValue}
            name="files"
            multiple={true}
            isEditing={isEditing}
          />
        )}
        rules={{
          required: 'Выберите  изображение!',
        }}
      />
    </div>
  );
};

export default FileForm;
