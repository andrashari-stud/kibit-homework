import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int, ObjectType } from 'type-graphql';
import { order } from '../types/order.type';

@ArgsType()
export class FindPropDto {
  @Field()
  propName: string;

  @Field()
  propValue: string;

  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 50;

  @Field(type => String, { nullable: true })
  order?: order = 'DESC';

  @Field({ nullable: true })
  fieldSort?: string = 'updatedAt';
}
