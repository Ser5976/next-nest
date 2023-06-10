"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoDbConfig = void 0;
const getMongoDbConfig = async (configService) => (Object.assign({ uri: configService.get('MONGO_URI') }, getMongoOptions()));
exports.getMongoDbConfig = getMongoDbConfig;
const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//# sourceMappingURL=mongo.config.js.map