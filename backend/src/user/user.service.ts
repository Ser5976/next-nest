import { UserModel } from './user.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { UpdateEmailDto } from './dto/update.email.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { SearchDto } from './dto/search.dto';

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
  // поиск  пользователя по по email
  async findUser(dto: SearchDto): Promise<DocumentType<UserModel>[]> {
    console.log(dto);
    const user = await this.UserModel.find({
      $or: [{ email: new RegExp(dto.email, 'i') }],
    }).select('-password -favorites -viewed -cart -purchaseHistory -reviews');
    return user;
  }

  // получаем  всех пользователей,выбираем чтобы обозначенные поля не попали в объект
  //и делаем сортировку по дате создания(последние созданные будут сверху)
  //если есть searchUser,то выберем конкретногопользователя
  async getAllUsers(): Promise<{
    users: DocumentType<UserModel>[];
    quantity: number;
  }> {
    const users = await this.UserModel.find()
      .select(
        '-password -__v -favorites -viewed -cart -purchaseHistory -reviews',
      ) //так мы исключаем ненужные поля
      .sort({ createdAt: 'desc' })
      .exec();
    if (!users) throw new NotFoundException('Пользователи не получены');
    // получаем количество пользователей
    const quantity = await this.UserModel.find().count().exec();
    return { users, quantity };
  }

  // удаление пользователя
  async deleteUsers(id: string) {
    const deleteUser = await this.UserModel.findByIdAndDelete(id).exec();
    // console.log(deleteUser);
    if (deleteUser) return { message: 'Пользователь удалён' };
    throw new NotFoundException('Такого пользователя не существует');
  }
}
