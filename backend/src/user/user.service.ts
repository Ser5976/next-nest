import { genSalt, hash } from 'bcryptjs';
import { UpdateDto } from './dto/update.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  //получение пользователя
  async byId(id: string): Promise<DocumentType<UserModel>> {
    const user = await this.UserModel.findById(id)
      .populate('reviews favorites viewed')
      .exec();
    if (user) return user;
    throw new NotFoundException('Такого пользователя не существует!');
  }
  //редактирование пользователя(email ,password)
  async updateProfileUser(_id: string, updateDto: UpdateDto) {
    const user = await this.UserModel.findById(_id).exec(); //находим пользователя
    // делаем проверку на существования похожего email
    const isSameUser = await this.UserModel.findOne({ email: updateDto.email });

    if (isSameUser && String(_id) !== String(isSameUser._id)) {
      throw new NotFoundException('Такой email существует ');
    }
    //меняем у пользователя email  и если есть пароль
    if (user) {
      if (updateDto.password) {
        const salt = await genSalt(7);
        user.password = await hash(updateDto.password, salt);
      }
      user.email = updateDto.email;
      await user.save(); // сохраняем
      return { message: 'Изменение прошло успешно' };
    }
    throw new NotFoundException('Такого пользователя нет');
  }

  //----------для админки----------------------------
  // получение всех пользователей
  async getAllUsers(searchUser?: string): Promise<DocumentType<UserModel>[]> {
    let options = {};
    if (searchUser) {
      options = {
        $or: [{ email: new RegExp(searchUser, 'i') }],
      };
    }
    // получаем, если нету конкретного поиска по email, всех пользователей,выбираем чтобы обозначенные поля не попали в объект
    //и делаем сортировку по дате создания(последние созданные будут сверху)
    //если есть searchUser,то выберем конкретногопользователя
    const users = await this.UserModel.find(options)
      .select('-password -__v') //так мы исключаем ненужные поля
      .sort({ createdAt: 'desc' })
      .exec();
    if (users) return users;
    throw new NotFoundException('Пользователи не получены');
  }

  // получение количества пользователей
  async quantityUsers() {
    return this.UserModel.find().count().exec();
  }
  // удаление пользователя
  async deleteUsers(id: string) {
    const deleteUser = await this.UserModel.findByIdAndDelete(id).exec();
    // console.log(deleteUser);
    if (deleteUser) return { message: 'Пользователь удалён' };
    throw new NotFoundException('Такого пользователя не существует');
  }
}
