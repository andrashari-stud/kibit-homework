import * as fs from 'fs';
import * as path from 'path';
import * as EasyGraphQLTester from 'easygraphql-tester';

describe('MoviesModule', () => {
  let tester: any;

  beforeAll(() => {
    const schema: any = fs.readFileSync(path.join(__dirname, '../../src', 'schema.gql'), 'utf8');
    tester = new EasyGraphQLTester(schema);
  });

  it('Valid moviesByProp query', done => {
    const query: string = `
      query moviesByProp($propName: String!, $propValue: String!) {
        moviesByProp(propName: $propName, propValue: $propValue) {
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
      }
    `;
    tester.test(true, query, { propName: 'actors', propValue: 'Diana' });
    done();
  });

  it('Valid fetchWikipediaPageById query', done => {
    const query: string = `
    query fetchWikipediaPageById($wikiDataId: String!) {
      fetchWikipediaPageById(wikiDataId: $wikiDataId) {
          wikipediaPageUrl
          firstParagraph
          imdbPageUrl
      }
    }
    `;
    tester.test(true, query, { wikiDataId: 'Q128518' });
    done();
  });

  it('Valid fetchRelatedMovies query', done => {
    const query: string = `
      query fetchRelatedMovies($id: String!) {
        fetchRelatedMovies(id: $id) {
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
      }
    `;
    tester.test(true, query, { id: '6101eb8fe4849e1e21ee7a54' });
    done();
  });
});
