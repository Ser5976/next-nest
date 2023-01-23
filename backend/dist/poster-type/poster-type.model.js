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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosterTypeModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const product_type_model_1 = require("../product-type/product-type.model");
class PosterTypeModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)(String),
    __metadata("design:type", String)
], PosterTypeModel.prototype, "picture", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => product_type_model_1.ProductTypeModel }),
    __metadata("design:type", Object)
], PosterTypeModel.prototype, "typeId", void 0);
exports.PosterTypeModel = PosterTypeModel;
//# sourceMappingURL=poster-type.model.js.map