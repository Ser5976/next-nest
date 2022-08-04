"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreReviewsModule = void 0;
const store_reviews_model_1 = require("./store-reviews.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const store_reviews_controller_1 = require("./store-reviews.controller");
const store_reviews_service_1 = require("./store-reviews.service");
let StoreReviewsModule = class StoreReviewsModule {
};
StoreReviewsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: store_reviews_model_1.StoreReviewsModel,
                    schemaOptions: {
                        collection: 'StoreReviews',
                    },
                },
            ]),
        ],
        controllers: [store_reviews_controller_1.StoreReviewsController],
        providers: [store_reviews_service_1.StoreReviewsService],
    })
], StoreReviewsModule);
exports.StoreReviewsModule = StoreReviewsModule;
//# sourceMappingURL=store-reviews.module.js.map