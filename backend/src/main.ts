import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5555;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(PORT, () =>
      console.log(`сервер запущен на порту ${PORT}`),
    );
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
