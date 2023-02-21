"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let OrderService = class OrderService {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async createOrder(dto, _id) {
        const order = await this.OrderModel.create(Object.assign(Object.assign({}, dto), { user: _id }));
        if (!order)
            throw new common_1.NotFoundException('Заказ не создан');
        return order;
    }
    async getOrder(dto) {
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
        if (!orders)
            throw new common_1.NotFoundException('Заказы не получены');
        const quantity = await this.OrderModel.find().count().exec();
        return { orders, quantity };
    }
    async executeAnOrder(dto) {
        const order = await this.OrderModel.updateOne({ _id: dto.orderId }, {
            execution: dto.bool,
            new: true,
        });
        if (!order)
            throw new common_1.NotFoundException('Изменение не произошло');
        return { message: 'заказ выполнен' };
    }
    async deleteOrder(id) {
        const deletedOrder = await this.OrderModel.findByIdAndDelete(id);
        if (!deletedOrder)
            throw new common_1.NotFoundException('заказ не удален');
        return { message: 'заказ удалён' };
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(order_model_1.OrderModel)),
    __metadata("design:paramtypes", [Object])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map