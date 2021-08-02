import { IsMongoId } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class FindIdDto {
  @Field()
  @IsMongoId({ each: true })
  id: string;
}
