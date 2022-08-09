import { OrderDto } from './dto/order.dto';
import { OrderModel } from './order.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel) private readonly OrderModel: ModelType<OrderModel>,
  ) {}
  //создание заказа
  async createOrder(dto: OrderDto) {
    const order = await this.OrderModel.create(dto);
    if (!order) throw new NotFoundException('Заказ не создан');
    return order;
  }
  // получение заказов
  async getOrder() {
    const order = await this.OrderModel.find().populate('product user');
    if (!order) throw new NotFoundException('Заказы не получены');
    return order;
  }
}
