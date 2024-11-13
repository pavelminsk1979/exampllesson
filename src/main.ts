import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSettings } from './settings/app-settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(appSettings.api.APP_PORT, () => {
    console.log('App starting listen port: ', appSettings.api.APP_PORT);
    console.log('ENV: ', appSettings.env.getEnv());
  });
}
bootstrap();
