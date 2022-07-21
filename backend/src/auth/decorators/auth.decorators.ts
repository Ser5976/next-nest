import { applyDecorators, UseGuards } from '@nestjs/common';
import { TypeRole } from '../auth.interface';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function Auth(role: TypeRole = 'user') {
  return applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
}

//кастомный декоратор,навешиваем на эндпоинты на которые могут зайти только авторизованные пользователи,
//а если передаем админ то только админы
