import { ArgsType } from 'type-graphql';
import { FindDto } from '../../common/dto/find.dto';

@ArgsType()
export class FindMoviesDto extends FindDto {}
