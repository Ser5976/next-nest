"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderModule = void 0;
const slider_model_1 = require("./slider.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const slider_controller_1 = require("./slider.controller");
const slider_service_1 = require("./slider.service");
let SliderModule = class SliderModule {
};
SliderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: slider_model_1.SliderModel,
                    schemaOptions: {
                        collection: 'Slider',
                    },
                },
            ]),
        ],
        controllers: [slider_controller_1.SliderController],
        providers: [slider_service_1.SliderService],
    })
], SliderModule);
exports.SliderModule = SliderModule;
//# sourceMappingURL=slider.module.js.map