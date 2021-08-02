import { Field, ObjectType, Int } from 'type-graphql';
import { IListItems } from '../../common/interfaces/list-items.interface';
import { MovieEntity as Movie } from './movie.entity';

@ObjectType('ListMovies')
export class ListMoviesEntity implements IListItems {
  @Field(type => [Movie])
  items: Movie[];

  @Field(type => Int)
  total: number;
}
