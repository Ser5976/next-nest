import { ExecuteDto } from './dto/execute.dto';
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
  async createOrder(dto: OrderDto, _id: string) {
    const order = await this.OrderModel.create({ ...dto, user: _id });
    if (!order) throw new NotFoundException('Заказ не создан');
    return order;
  }
  // получение заказов
  async getOrder() {
    const order = await this.OrderModel.find()
      .populate('productCart user')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!order) throw new NotFoundException('Заказы не получены');
    return order;
  }
  // отметка о выполнении заказа
  async executeAnOrder(dto: ExecuteDto) {
    const order = await this.OrderModel.updateOne(
      { _id: dto.reviewsId },
      {
        execution: dto.bool,
        new: true,
      },
    );
    if (!order) throw new NotFoundException('Изменение не произошло');
    return { message: 'заказ выполнен' };
  }
}
