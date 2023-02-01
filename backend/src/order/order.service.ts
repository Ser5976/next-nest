import { ExecuteDto } from './dto/execute.dto';
import { OrderDto } from './dto/order.dto';
import { OrderModel } from './order.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel) private readonly OrderModel: ModelType<OrderModel>,
  ) {}
  //создание заказа
  async createOrder(
    dto: OrderDto,
    _id: string,
  ): Promise<DocumentType<OrderModel>> {
    const order = await this.OrderModel.create({ ...dto, user: _id });
    if (!order) throw new NotFoundException('Заказ не создан');
    return order;
  }
  // получение(или поиск) заказов
  async getOrder(dto: SearchDto): Promise<{
    orders: DocumentType<OrderModel>[];
    quantity: number;
  }> {
    let options = {};
    if (dto.email) {
      options = {
        $or: [
          {
            email: new RegExp(dto.email, 'i'),
          },
        ],
      };
    }
    const orders = await this.OrderModel.find(options)
      .populate('productCart user')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!orders) throw new NotFoundException('Заказы не получены');
    //получене количества заказов
    const quantity = await this.OrderModel.find().count().exec();

    return { orders, quantity };
  }
  // отметка о выполнении заказа
  async executeAnOrder(dto: ExecuteDto) {
    const order = await this.OrderModel.updateOne(
      { _id: dto.orderId },
      {
        execution: dto.bool,
        new: true,
      },
    );
    if (!order) throw new NotFoundException('Изменение не произошло');
    return { message: 'заказ выполнен' };
  }
  //удаление заказа
  async deleteOrder(id: string): Promise<{ message: string }> {
    const deletedOrder = await this.OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) throw new NotFoundException('заказ не удален');
    return { message: 'заказ удалён' };
  }
}
