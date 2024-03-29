import { LoginDto } from './dto/login.dto ';
import { RegistrationDto } from './dto/registration.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { hash, genSalt, compare } from 'bcryptjs';
import { UserModel } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegistrationDto) {
    //проверка на существование в базе  email
    const candidate = await this.UserModel.findOne({ email: dto.email });
    if (candidate)
      throw new BadRequestException('Пользователь с таким email уже есть');
    // проверка на существования админа в базе
    const admin = await this.UserModel.find({ isAdmin: true });
    // хэширование пароля
    const salt = await genSalt(7);

    const newUser = new this.UserModel({
      email: dto.email,
      password: await hash(dto.password, salt),
    });
    const user = await newUser.save();
    //первый юзер в базе автоматически станет админом
    if (!admin) {
      await this.UserModel.updateOne({ _id: user._id }, { isAdmin: true });
    }

    // создаём токены
    const tokens = await this.generatePairToken(String(user._id));
    //посылаем на клиент
    return { user: this.returnUserFields(user), ...tokens };
  }
  async login(dto: LoginDto) {
    //проверка на существование в базе  пользователя
    const user = await this.UserModel.findOne({ email: dto.email });
    if (!user)
      throw new UnauthorizedException(
        'Пользователя с таким email не существует',
      );
    // проверка пароля
    const validPassword = await compare(dto.password, user.password);
    if (!validPassword) throw new BadRequestException('Пароль неверный');
    // создаём токены
    const tokens = await this.generatePairToken(String(user._id));
    //посылаем на клиент
    return { user: this.returnUserFields(user), ...tokens };
  }
  //получение нового токена
  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken)
      throw new UnauthorizedException('войдите в систему пожалуйста');
    const result = await this.jwtService.verifyAsync(refreshToken);
    //console.log('result:', result);
    if (!result) throw new UnauthorizedException('токен невалидный');
    const user = await this.UserModel.findById(result._id);

    const tokens = await this.generatePairToken(String(user._id));

    return { user: this.returnUserFields(user), ...tokens };
  }
  //генерация пары токенов(access,refresh)
  async generatePairToken(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }
  //-----------------------------------------
  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
