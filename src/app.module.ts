import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConnectionOptions } from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(postgresConnectionOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
