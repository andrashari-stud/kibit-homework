// Az eredményben legyen benne a külső Wikipedia oldal és az IMDB oldal linkje.
export interface IFetchWikipediaPageByIdResult {
  wikipediaPageUrl: string;
  imdbPageUrl: string;
  firstParagraph: string;
}
