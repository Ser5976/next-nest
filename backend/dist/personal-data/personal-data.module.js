"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDataModule = void 0;
const user_model_1 = require("../user/user.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const common_1 = require("@nestjs/common");
const personal_data_controller_1 = require("./personal-data.controller");
const personal_data_service_1 = require("./personal-data.service");
let PersonalDataModule = class PersonalDataModule {
};
PersonalDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: {
                        collection: 'User',
                    },
                },
            ]),
        ],
        controllers: [personal_data_controller_1.PersonalDataController],
        providers: [personal_data_service_1.PersonalDataService],
    })
], PersonalDataModule);
exports.PersonalDataModule = PersonalDataModule;
//# sourceMappingURL=personal-data.module.js.map