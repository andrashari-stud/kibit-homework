import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { MovieRepository } from './repositories/movie.repository';
import { ServiceHelper } from '../common/helpers/service.helper';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  providers: [MoviesService, MoviesResolver, ServiceHelper],
})
export class MoviesModule {}
