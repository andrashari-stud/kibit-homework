import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('FetchWikipediaByIdResult')
@ObjectType('FetchWikipediaByIdResult')
export class FetchWikipediaByIdResultEntity {
  @ObjectIdColumn()
  readonly id: ObjectID;

  @Field()
  @Column()
  wikipediaPageUrl: string;

  @Field()
  @Column()
  firstParagraph: string;

  @Field()
  @Column()
  imdbPageUrl: string;
}
