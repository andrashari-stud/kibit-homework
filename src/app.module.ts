import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { DateScalar } from './common/scalars/date.scalar';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      debug: process.env.NODE_ENV === 'development',
    }),
    MoviesModule,
  ],
  // controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
