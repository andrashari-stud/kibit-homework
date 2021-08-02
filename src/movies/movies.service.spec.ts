import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MovieRepository } from './repositories/movie.repository';
import { ServiceHelper } from '../common/helpers/service.helper';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, MovieRepository, ServiceHelper],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
