import { UpdatePepsonalDataDto } from '../personal-data/dto/update-personaldata.dto';
import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { UpdateDto } from './dto/update.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserServies: UserService) {}
  @Get('profileUser')
  @Auth() //кастомный декоратор,навешиваем на эндпойнты на которые могут зайти только авторизованные пользователи,
  //а если передаем админ то только админы
  //@User тоже кастомный декоратор для получения юзера, только когда мы авторизованы
  async getProfile(@User('_id') _id: string) {
    return this.UserServies.byId(_id);
  }
  // редактирование email, password
  @UsePipes(new ValidationPipe()) //валидация dto
  @Put('profileUser')
  @HttpCode(200)
  @Auth()
  async updateProfileUser(@User('_id') _id, @Body() updateDto: UpdateDto) {
    return this.UserServies.updateProfileUser(_id, updateDto);
  }

  //----------------для админки-------------------------
  // получение всех пользователей или одного выбранного
  @Get()
  @Auth('admin')
  async getAllusers(@Query('searchUser') searchUser?: string) {
    return this.UserServies.getAllUsers(searchUser);
  }
  //получение пользователя
  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id', IdValidationPipe) id: string) {
    return this.UserServies.byId(id);
  }

  // получение количество пользователей
  @Get('count')
  @Auth('admin')
  async quantityUsers() {
    return this.UserServies.quantityUsers();
  }
  // удаление пользователя
  @Delete(':id')
  @Auth('admin')
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.UserServies.deleteUsers(id);
  }
}
