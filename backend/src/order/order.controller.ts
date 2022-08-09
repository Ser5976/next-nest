import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}
  //создание заказа
  @UsePipes(new ValidationPipe())
  @Post()
  async createOrder(@Body() dto: OrderDto) {
    return this.OrderService.createOrder(dto);
  }
  //получение заказов
  @Get()
  @Auth('admin')
  async getOrder() {
    return this.OrderService.getOrder();
  }
}
