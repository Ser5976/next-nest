import { compare, genSalt, hash } from 'bcryptjs';
import { UpdateEmailDto } from './dto/update.email.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UpdatePasswordDto } from './dto/update.password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  //получение пользователя
  async byId(id: string): Promise<DocumentType<UserModel>> {
    const user = await this.UserModel.findById(id)
      .populate('reviews favorites viewed')
      .select('-password -__v') //так мы исключаем ненужные поля
      .exec();
    if (user) return user;
    throw new NotFoundException('Такого пользователя не существует!');
  }
  //редактирование пользователя email
  async updateEmail(_id: string, updateEmailDto: UpdateEmailDto) {
    const user = await this.UserModel.findById(_id).exec(); //находим пользователя
    // делаем проверку на существования похожего email
    const isSameUser = await this.UserModel.findOne({
      email: updateEmailDto.email,
    });

    if (isSameUser && String(_id) !== String(isSameUser._id)) {
      throw new BadRequestException('Такой email существует ');
    }
    //проверка пароля
    const validPassword = await compare(updateEmailDto.password, user.password);
    if (!validPassword) throw new BadRequestException('Пароль неверный');
    //меняем у пользователя email
    user.email = updateEmailDto.email;
    await user.save(); // сохраняем
    return { message: 'Изменение прошло успешно' };
  }
  //меняем у пользователя  пароль
  async updatePassoword(_id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.UserModel.findById(_id).exec(); //находим пользователя
    //проверка пароля
    const validPassword = await compare(
      updatePasswordDto.currentPassword,
      user.password,
    );
    if (!validPassword) throw new BadRequestException('Пароль неверный');
    //меняем у пользователя пароль
    const salt = await genSalt(7);
    user.password = await hash(updatePasswordDto.password, salt);

    await user.save(); // сохраняем
    return { message: 'Изменение прошло успешно' };
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
