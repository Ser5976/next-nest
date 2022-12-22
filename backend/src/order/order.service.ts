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
  // получение заказов
  async getOrder(): Promise<{
    orders: DocumentType<OrderModel>[];
    quantity: number;
  }> {
    const orders = await this.OrderModel.find()
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
  // поиск  заказа  по email
  async findOrders(dto: SearchDto): Promise<DocumentType<OrderModel>[]> {
    // console.log('Поиск:', dto);
    const orders = await this.OrderModel.find({
      $or: [{ email: new RegExp(dto.email, 'i') }],
    }).populate('productCart user');
    return orders;
  }
  //удаление заказа
  async deleteOrder(id: string): Promise<{ message: string }> {
    const deletedOrder = await this.OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) throw new NotFoundException('заказ не удален');
    return { message: 'заказ удалён' };
  }
}
