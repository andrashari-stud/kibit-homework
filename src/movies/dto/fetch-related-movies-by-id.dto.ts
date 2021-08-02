import { ArgsType, Field } from 'type-graphql';
import { FindIdDto } from '../../common/dto/find-id.dto';

@ArgsType()
export class FetchRelatedMoviesByIdDto extends FindIdDto {}
