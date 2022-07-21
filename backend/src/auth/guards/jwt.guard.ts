import { AuthGuard } from '@nestjs/passport';
//  навешиваем на эндпоинты на которые могут зайти только авторизованные пользователи
export class JwtAuthGuard extends AuthGuard('jwt') {}
