"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForCustomersModule = void 0;
const for_customers_model_1 = require("./for-customers.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const for_customers_controller_1 = require("./for-customers.controller");
const for_customers_service_1 = require("./for-customers.service");
let ForCustomersModule = class ForCustomersModule {
};
ForCustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: for_customers_model_1.ForCustomersModel,
                    schemaOptions: {
                        collection: 'ForCustomers',
                    },
                },
            ]),
        ],
        controllers: [for_customers_controller_1.ForCustomersController],
        providers: [for_customers_service_1.ForCustomersService],
    })
], ForCustomersModule);
exports.ForCustomersModule = ForCustomersModule;
//# sourceMappingURL=for-customers.module.js.map