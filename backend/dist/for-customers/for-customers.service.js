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
exports.ForCustomersService = void 0;
const for_customers_model_1 = require("./for-customers.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let ForCustomersService = class ForCustomersService {
    constructor(ForCustomersModel) {
        this.ForCustomersModel = ForCustomersModel;
    }
    async createData(dto) {
        const data = await this.ForCustomersModel.create(dto);
        if (!data)
            throw new common_1.NotFoundException('Что то пошло не так,данные не созданы');
        return data;
    }
    async getAllData() {
        const data = await this.ForCustomersModel.find();
        if (!data)
            throw new common_1.NotFoundException('Что то пошло не так,данные не получены');
        return data;
    }
    async getData(id) {
        const data = await this.ForCustomersModel.findById(id);
        if (!data)
            throw new common_1.NotFoundException('Что то пошло не так,данные не получены');
        return data;
    }
    async updateData(id, dto) {
        const newData = await this.ForCustomersModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!newData)
            throw new common_1.NotFoundException('Что то пошло не так,данные не отредактированы');
        return newData;
    }
    async deleteData(id) {
        const deleteData = await this.ForCustomersModel.findByIdAndDelete(id);
        if (!deleteData)
            throw new common_1.NotFoundException('Что то пошло не так,данные не удалены');
        return { message: 'Данные удалены' };
    }
};
ForCustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(for_customers_model_1.ForCustomersModel)),
    __metadata("design:paramtypes", [Object])
], ForCustomersService);
exports.ForCustomersService = ForCustomersService;
//# sourceMappingURL=for-customers.service.js.map