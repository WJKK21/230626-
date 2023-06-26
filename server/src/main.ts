import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 정적 파일 제공을 위한 설정
  app.useStaticAssets(path.join(__dirname, '..', 'client', 'build'));

  // 모든 경로에 대해 리액트 애플리케이션의 index.html을 반환
  app.use('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html'),
    );
  });

  await app.listen(3001);
}
bootstrap();
