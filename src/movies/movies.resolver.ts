import { Query, Args, Resolver } from '@nestjs/graphql';
import { MovieEntity as Movie } from './entities/movie.entity';
import { ListMoviesEntity as listMovies } from './entities/list-movies.entity';
import { FindMoviesDto } from './dto/find-movies.dto';
import { FindMoviesByPropDto } from './dto/find-movies-by-prop.dto';
import { FetchRelatedMoviesByIdDto } from './dto/fetch-related-movies-by-id.dto';
import { FetchWikipediaPageByIdDto } from './dto/fetch-wikipedia-by-id.dto';
import { MoviesService } from './movies.service';
import { FetchWikipediaByIdResultEntity as wikipediaPageResult } from './entities/fetch-wikipedia-page-by-id-result.entity';
import { IFetchWikipediaPageByIdResult } from '../models/endpoints/wikipedia';
import { IErrorResponse } from 'src/models/endpoints/error';

@Resolver(of => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => listMovies)
  movies(@Args() queryArgs: FindMoviesDto): Promise<listMovies> {
    return this.moviesService.FindMovies(queryArgs);
  }

  @Query(() => listMovies)
  moviesByProp(@Args() queryArgs: FindMoviesByPropDto): Promise<listMovies> {
    return this.moviesService.FindMoviesByProp(queryArgs);
  }

  @Query(() => wikipediaPageResult)
  fetchWikipediaPageById(
    @Args() queryArgs: FetchWikipediaPageByIdDto,
  ): Promise<IFetchWikipediaPageByIdResult | IErrorResponse> {
    return this.moviesService.fetchWikipediaPageById(queryArgs);
  }

  @Query(() => listMovies)
  fetchRelatedMovies(@Args() queryArgs: FetchRelatedMoviesByIdDto): Promise<listMovies> {
    return this.moviesService.fetchRelatedMoviesById(queryArgs);
  }
}
