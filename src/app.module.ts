import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './models/location';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [Location],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Location]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }