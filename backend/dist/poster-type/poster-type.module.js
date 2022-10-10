"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosterTypeModule = void 0;
const poster_type_model_1 = require("./poster-type.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const poster_type_controller_1 = require("./poster-type.controller");
const poster_type_service_1 = require("./poster-type.service");
let PosterTypeModule = class PosterTypeModule {
};
PosterTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: poster_type_model_1.PosterTypeModel,
                    schemaOptions: {
                        collection: 'Poster',
                    },
                },
            ]),
        ],
        controllers: [poster_type_controller_1.PosterTypeController],
        providers: [poster_type_service_1.PosterTypeService],
    })
], PosterTypeModule);
exports.PosterTypeModule = PosterTypeModule;
//# sourceMappingURL=poster-type.module.js.map