# Kibit homework "Movies" application

## Query 1.: moviesByProp

### description

Query for any of props of movies (entity):

- year
- title
- actors
- genres
- createdAt
- updatedAt
- wikiDataId.

### params

```
(propName: string, propValue: string)
```

### response

```
{
    items: [{
            year: string,
            title: string,
            actors:str: string,
            createdAt: string,
            updatedAt: string,
            wikiDataId: string,
        }],
    total
}
```

### example query:

```
{
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
}
```

### example response

```
{
  "data": {
    "moviesByProp": {
      "items": [
        {
          "year": "1969",
          "title": "On Her Majesty's Secret Service",
          "actors": [
            "Telly Savalas",
            "George Lazenby",
            "Diana Rigg"
          ],
          "genres": [
            "action",
            "adventure",
            "thriller"
          ],
          "createdAt": "2021-07-29T22:00:00.000Z",
          "updatedAt": "2021-07-29T22:00:00.000Z",
		  "wikiDataId": "Q107894"
        }
      ],
      "total": 1
    }
  }
}
```

## Query 2.: fetchWikipediaPageById

### description

Query to fetch Wikipedia and IMDB urls based on WikiData id.

### params

```
(wikiDataId: string)
```

### response

```
{wikipediaPageUrl: string, firstParagraph:string, imdbPageUrl: string}
```

### example query:

```
{
  fetchWikipediaPageById(wikiDataId: "Q128518") {
	wikipediaPageUrl
    firstParagraph
    imdbPageUrl
  }
}
```

### example response

```
{
  "data": {
    "fetchWikipediaPageById": {
      "wikipediaPageUrl": "https://en.wikipedia.org/wiki/On_Her_Majesty%27s_Secret_Service_(film)",
      "firstParagraph": "'''''On Her Majesty's Secret Service''''' is a 1969 [[spy film]] and the sixth in the [[List of James Bond films|''James Bond'' series]] produced by [[Eon Productions]]. It is based on the [[On Her Majesty's Secret Service (novel)|1963 novel]] by [[Ian Fleming]]. Following [[Sean Connery]]'s decision to retire from the role after ''[[You Only Live Twice (film)|You Only Live Twice]]'', Eon Productions selected [[George Lazenby]], a model with no prior acting credits, to play the part of [[James Bond filmography|James Bond]]. During the making of the film, Lazenby announced that he would play the role of Bond only once.",
      "imdbPageUrl": "https://www.imdb.com/title/tt0064757"
    }
  }
}
```

## Query 3.: fetchRelatedMovies

### description

Query to fetch related movies based on actors.

### params

```
(id: string)
```

### response

```
{
    items: [{
            year: string,
            title: string,
            actors:str: string,
            createdAt: string,
            updatedAt: string,
            wikiDataId: string,
        }],
    total
}
```

### example query:

```
{
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
}
```

### example response

```
{
  "data": {
    "fetchRelatedMovies": {
      "items": [
        {
          "year": "1967",
          "title": "The Dirty Dozen",
          "actors": [
            "Charles Bronson",
            "Lee Marvin",
            "Telly Savalas"
          ],
          "genres": [
            "adventure",
            "action",
            "war"
          ],
          "createdAt": "2021-01-01T00:00:00.000Z",
          "updatedAt": "2021-06-29T22:00:00.000Z",
          "wikiDataId": "Q470735"
        }
      ],
      "total": 1
    }
  }
}
```

## Author

**András Imre Hári**
