import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Movie')
@ObjectType('Movie')
export class MovieEntity {
  @ObjectIdColumn()
  readonly id: ObjectID;

  @Field()
  @Column()
  title: string;

  // @Field(type => Int)
  @Field()
  @Column()
  year: string;

  @Field(type => [String])
  @Column()
  actors: string[];

  @Field(type => [String])
  @Column()
  genres: string[];

  @Field()
  @Column()
  wikiDataId: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
