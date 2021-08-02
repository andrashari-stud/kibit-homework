import { Injectable } from '@nestjs/common';
import { FindMoviesDto } from './dto/find-movies.dto';
import { FindMoviesByPropDto } from './dto/find-movies-by-prop.dto';
import { FetchWikipediaPageByIdDto } from './dto/fetch-wikipedia-by-id.dto';
import { FetchRelatedMoviesByIdDto } from './dto/fetch-related-movies-by-id.dto';

import { ListMoviesEntity } from './entities/list-movies.entity';
import { MovieRepository } from './repositories/movie.repository';
import { ServiceHelper } from '../common/helpers/service.helper';

import apiUrls from '../constants/apiUrls';
import { getApiResponse } from '../utils/request';
import { FetchWikipediaPageByIdResult } from '../models/endpoints/wikipedia';
import { AxiosResponse } from 'axios';

import { uniqBy } from 'lodash';

@Injectable()
export class MoviesService {
  constructor(private readonly serviceHelper: ServiceHelper, private readonly movieRepository: MovieRepository) {}

  // movies query to test
  async FindMovies(params: FindMoviesDto): Promise<ListMoviesEntity> {
    return await this.serviceHelper.findAll(params, this.movieRepository);
  }
  /**
   * Task 1
   * Query for fetch movies by any prop, e.g. title or actor
   * @description A szolgáltatásban legyen lehetőség filmeket keresni cím vagy színész alapján
   * - ez működhet statikus/mock adat, vagy adatbázis alapon is, de külső szolgáltatás (pl.
   * IMDB, TMDB) használata nem része a feladatnak.
   * @param params: FindMoviesByPropDto
   * @returns ListMoviesEntity
   */
  async FindMoviesByProp(params: FindMoviesByPropDto): Promise<ListMoviesEntity> {
    return await this.serviceHelper.findAllByProp(params, this.movieRepository);
  }

  /** Fetch Wikipedia page url and first paragraph of the content of that.
   * Task 2
   * @description Egy másik lekérdezésben legyen lehetőség egy adott filmhez azonosító alapján
   * megtalálni a kapcsolódó angol Wikipedia oldalt (REST kéréssel) és annak első bekezdését.
   * Az eredményben legyen benne a külső Wikipedia oldal és az IMDB oldal linkje.
   * @param id
   * @returns String
   */
  async fetchWikipediaPageById(params: FetchWikipediaPageByIdDto): Promise<FetchWikipediaPageByIdResult> {
    const { wikiDataId } = params;
    const res: AxiosResponse = await getApiResponse({
      url: apiUrls.WIKIDATA,
      params: {
        action: 'wbgetentities',
        props: 'sitelinks/urls',
        ids: wikiDataId,
        sitefilter: 'enwiki',
        format: 'json',
      },
    });
    const wikipediaPageUrl = res.data.entities[wikiDataId].sitelinks.enwiki.url;
    const wikipediaTitle = res.data.entities[wikiDataId].sitelinks.enwiki.title;

    const contentResult: any = await getApiResponse({
      url: apiUrls.WIKIPEDIA,
      params: {
        action: 'query',
        prop: 'revisions',
        titles: wikipediaTitle.replace(/ /g, '_'),
        utf8: 1,
        format: 'json',
        rvprop: 'content',
      },
    });
    const pages = contentResult.data.query.pages;
    const firstParagraph = pages[Object.keys(pages)[0]].revisions[0]['*'].split(`\n\n`)[1];
    // Query: SELECT IMDB_ID WHERE {wd:${wikiDataId} wdt:P345 ?IMDB_ID .}
    const imdbIdResult: any = await getApiResponse({
      url: apiUrls.SPARQL,
      params: {
        query: `SELECT ?IMDB_ID WHERE {wd:${wikiDataId} wdt:P345 ?IMDB_ID}`.replace(/ /g, '+'),
        format: 'json',
      },
    });
    const imdbPageUrl = `https://www.imdb.com/title/${imdbIdResult.data.results.bindings[0].IMDB_ID.value}`;
    return { wikipediaPageUrl, firstParagraph, imdbPageUrl };
  }

  /**
   * Bonus 1
   * Query for related movies by any prop, e.g. title or actor
   * @description Egy másik lekérdezésben egy filmhez az app megkeresi a “kapcsolódó” filmeket
   *  valamely logika mentén (pl. hasonló kategória, színész, értékelés, stb.)
   * @param params
   * @returns ListMoviesEntity
   */
  async fetchRelatedMoviesById(params: FetchRelatedMoviesByIdDto): Promise<ListMoviesEntity> {
    const { id } = params;
    const movieData = await this.movieRepository.findOne(id);
    const promises = movieData.actors.map(actor =>
      this.serviceHelper.findAllByProp(
        { propName: 'actors', propValue: actor, skip: 0, take: 3, order: 'DESC', fieldSort: 'updatedAt' },
        this.movieRepository,
      ),
    );
    const responses = await Promise.all(promises);
    const movies = [];
    responses.forEach(res => res.items.forEach(item => movies.push(item)));
    const uniqueMovies = uniqBy(movies, 'wikiDataId').filter(data => '' + data.id !== id);
    return { items: uniqueMovies, total: uniqueMovies.length };
  }
}
