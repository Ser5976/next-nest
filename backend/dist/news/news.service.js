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
exports.NewsService = void 0;
const news_model_1 = require("./news.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let NewsService = class NewsService {
    constructor(NewsModel) {
        this.NewsModel = NewsModel;
    }
    async createNews(dto) {
        const news = await this.NewsModel.create(dto);
        if (!news)
            throw new common_1.NotFoundException('Что то пошло не так,статья не сохранена');
        return news;
    }
    async getAllNews() {
        const news = await this.NewsModel.find();
        if (!news)
            throw new common_1.NotFoundException('Что то пошло не так,статьи не получены');
        return news;
    }
    async getNews(id) {
        const news = await this.NewsModel.findById(id);
        if (!news)
            throw new common_1.NotFoundException('Что то пошло не так,статья не получена');
        return news;
    }
    async updetNews(id, dto) {
        const newNews = await this.NewsModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!newNews)
            throw new common_1.NotFoundException('Что то пошло не так,статья не отредактирована');
        return newNews;
    }
    async deleteNews(id) {
        const deleteNews = await this.NewsModel.findByIdAndDelete(id);
        if (!deleteNews)
            throw new common_1.NotFoundException('Что то пошло не так,статья не удалена');
        return deleteNews;
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(news_model_1.NewsModel)),
    __metadata("design:paramtypes", [Object])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map