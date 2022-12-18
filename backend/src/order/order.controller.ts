import { ExecuteDto } from './dto/execute.dto';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from 'src/user/decorators/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}
  //создание заказа
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth()
  async createOrder(@User('_id') _id: string, @Body() dto: OrderDto) {
    return this.OrderService.createOrder(dto, _id);
  }
  //получение заказов
  @Get()
  @Auth('admin')
  async getOrder() {
    return this.OrderService.getOrder();
  }
  //отметиь выполнения заказа
  @UsePipes(new ValidationPipe())
  @Put()
  @Auth('admin')
  async executeAnOrder(@Body() dto: ExecuteDto) {
    return this.OrderService.executeAnOrder(dto);
  }
}
