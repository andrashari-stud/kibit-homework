import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepository } from './movie.repository';

describe('MovieRepository', () => {
  let repo: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieRepository],
    }).compile();

    repo = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });
});
