import { useAsyncExecutor } from "async-executor-hook";
import { delay, map, of } from "rxjs";
import { ajax } from "rxjs/ajax";

interface APICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Character {
  img: string;
  name: string;
  status: string;
  species: string;
  type: string;
}

interface CharactersResponse {
  prevLink?: string;
  nextLink?: string;
  totalPages: number;
  characters: Character[];
}

async function fetchCharacters(page: number): Promise<CharactersResponse> {
  return fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      return {
        prevLink: data.info.prev,
        nextLink: data.info.next,
        totalPages: data.info.pages,
        characters: data.results.map((character: APICharacter): Character => {
          return {
            img: character.image,
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type,
          };
        }),
      };
    });
}

export function useCharacters() {
  const { data, status } = useAsyncExecutor(
    () => {
      return ajax.getJSON("https://rickandmortyapi.com/api/character").pipe(
        delay(1000),
        map((data: any) => {
          return {
            prevLink: data.info.prev,
            nextLink: data.info.next,
            totalPages: data.info.pages,
            characters: data.results.map(
              (character: APICharacter): Character => {
                return {
                  img: character.image,
                  name: character.name,
                  status: character.status,
                  species: character.species,
                  type: character.type,
                };
              },
            ),
          };
        }),
      );
    },
    { source$: of({}) },
  );

  return { data, status };
}

export type { Character };
export { fetchCharacters };
