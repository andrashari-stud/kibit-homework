import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { MovieRepository } from './repositories/movie.repository';
import { ServiceHelper } from '../common/helpers/service.helper';

describe('MoviesResolver', () => {
  let resolver: MoviesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, MoviesResolver, MovieRepository, ServiceHelper],
    }).compile();

    resolver = module.get<MoviesResolver>(MoviesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
