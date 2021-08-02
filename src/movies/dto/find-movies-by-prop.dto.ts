import { ArgsType, Field } from 'type-graphql';
import { FindPropDto } from '../../common/dto/find-prop.dto';

@ArgsType()
export class FindMoviesByPropDto extends FindPropDto {
  @Field()
  propName: string;

  @Field()
  propValue: string;
}
