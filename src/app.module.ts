import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shaocarlemon:higohe84@cluster1.kgnre35.mongodb.net/blog?retryWrites=true&w=majority',
    ),
    MoviesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/static/images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
