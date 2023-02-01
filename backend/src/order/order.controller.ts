import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { SearchDto } from './../user/dto/search.dto';
import { ExecuteDto } from './dto/execute.dto';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  //получение(или поиск) заказов
  @Get()
  @Auth('admin')
  async getOrder(@Query() dto: SearchDto) {
    return this.OrderService.getOrder(dto);
  }
  //отметь выполнения заказа
  @UsePipes(new ValidationPipe())
  @Put()
  @Auth('admin')
  async executeAnOrder(@Body() dto: ExecuteDto) {
    return this.OrderService.executeAnOrder(dto);
  }
  //удаление заказа
  @Delete(':id')
  @Auth()
  async deleteOrder(@Param('id', IdValidationPipe) id: string) {
    return this.OrderService.deleteOrder(id);
  }
}
