"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mongo_config_1 = require("./config/mongo.config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const personal_data_module_1 = require("./personal-data/personal-data.module");
const product_module_1 = require("./product/product.module");
const favorites_module_1 = require("./favorites/favorites.module");
const viewed_module_1 = require("./viewed/viewed.module");
const reviews_module_1 = require("./reviews/reviews.module");
const rating_module_1 = require("./rating/rating.module");
const cart_module_1 = require("./cart/cart.module");
const brand_module_1 = require("./brand/brand.module");
const product_type_module_1 = require("./product-type/product-type.module");
const file_module_1 = require("./file/file.module");
const category_product_module_1 = require("./category-product/category-product.module");
const news_module_1 = require("./news/news.module");
const store_reviews_module_1 = require("./store-reviews/store-reviews.module");
const for_customers_module_1 = require("./for-customers/for-customers.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_typegoose_1.TypegooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: mongo_config_1.getMongoDbConfig,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            personal_data_module_1.PersonalDataModule,
            product_module_1.ProductModule,
            favorites_module_1.FavoritesModule,
            viewed_module_1.ViewedModule,
            reviews_module_1.ReviewsModule,
            rating_module_1.RatingModule,
            cart_module_1.CartModule,
            brand_module_1.BrandModule,
            product_type_module_1.ProductTypeModule,
            file_module_1.FileModule,
            category_product_module_1.CategoryProductModule,
            news_module_1.NewsModule,
            store_reviews_module_1.StoreReviewsModule,
            for_customers_module_1.ForCustomersModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map