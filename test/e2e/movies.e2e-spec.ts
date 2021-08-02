import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('MoviesResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(3000);
  });

  it('Query movies', async done => {
    const query = {
      query: `{
        movies {
          items {
            year
            title
            actors
            genres
            createdAt
            updatedAt
            wikiDataId
          }
          total
        }
      }`,
    };

    request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .end((error, response) => {
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
          expect.objectContaining({
            movies: {
              items: [
                {
                  year: '1969',
                  title: "On Her Majesty's Secret Service",
                  actors: ['Telly Savalas', 'George Lazenby', 'Diana Rigg'],
                  genres: ['action', 'adventure', 'thriller'],
                  createdAt: '2021-07-29T22:00:00.000Z',
                  updatedAt: '2021-07-29T22:00:00.000Z',
                  wikiDataId: 'Q107894',
                },
                {
                  year: '2000',
                  title: 'Gladiator',
                  actors: ['Russel Crowe', 'Joaquin Phoenix', 'Oliver Reed'],
                  genres: ['action', 'adventure', 'drama'],
                  createdAt: '2021-05-19T22:00:00.000Z',
                  updatedAt: '2021-07-01T22:00:00.000Z',
                  wikiDataId: 'Q128518',
                },
                {
                  year: '1967',
                  title: 'The Dirty Dozen',
                  actors: ['Charles Bronson', 'Lee Marvin', 'Telly Savalas'],
                  genres: ['adventure', 'action', 'war'],
                  createdAt: '2021-01-01T00:00:00.000Z',
                  updatedAt: '2021-06-29T22:00:00.000Z',
                  wikiDataId: 'Q470735',
                },
              ],
              total: 3,
            },
          }),
        );
        done();
      });
  });

  // =====

  it('Query moviesByProp', done => {
    const query = {
      query: `{
        moviesByProp(propName: "actors", propValue: "Diana") {
          items {
            year
            title
            actors
            genres
            createdAt
            updatedAt
            wikiDataId
          }
          total
        }
      }`,
    };

    request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .end((error, response) => {
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
          expect.objectContaining({
            moviesByProp: {
              items: [
                {
                  year: '1969',
                  title: "On Her Majesty's Secret Service",
                  actors: ['Telly Savalas', 'George Lazenby', 'Diana Rigg'],
                  genres: ['action', 'adventure', 'thriller'],
                  createdAt: '2021-07-29T22:00:00.000Z',
                  updatedAt: '2021-07-29T22:00:00.000Z',
                  wikiDataId: 'Q107894',
                },
              ],
              total: 1,
            },
          }),
        );
        done();
      });
  });

  it('Query fetchWikipediaPageById', done => {
    const query = {
      query: `{
        fetchWikipediaPageById(wikiDataId: "Q128518") {
          wikipediaPageUrl
          imdbPageUrl
        }
      }`,
    };

    request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .end((error, response) => {
        expect(response.status).toBe(200);
        expect.objectContaining({
          fetchWikipediaPageById: {
            wikipediaPageUrl: 'https://en.wikipedia.org/wiki/Gladiator_(2000_film)',
            imdbPageUrl: 'https://www.imdb.com/title/tt0172495',
          },
        });
        done();
      });
  });

  it('Query fetchRelatedMovies', done => {
    const query = {
      query: `{
        fetchRelatedMovies(id: "6101eb8fe4849e1e21ee7a54") {
          items {
            year
            title
            actors
            genres
            createdAt
            updatedAt
            wikiDataId
          }
          total
        }
      }`,
    };

    request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .end((error, response) => {
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
          expect.objectContaining({
            fetchRelatedMovies: {
              items: [
                {
                  year: '1967',
                  title: 'The Dirty Dozen',
                  actors: ['Charles Bronson', 'Lee Marvin', 'Telly Savalas'],
                  genres: ['adventure', 'action', 'war'],
                  createdAt: '2021-01-01T00:00:00.000Z',
                  updatedAt: '2021-06-29T22:00:00.000Z',
                  wikiDataId: 'Q470735',
                },
              ],
              total: 1,
            },
          }),
        );
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
