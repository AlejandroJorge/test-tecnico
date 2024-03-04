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

async function fetchCharacters(): Promise<Character[]> {
  return fetch(`https://rickandmortyapi.com/api/character`)
    .then((response) => response.json())
    .then((data) =>
      data.results.map((character: APICharacter): Character => {
        return {
          img: character.image,
          name: character.name,
          status: character.status,
          species: character.species,
          type: character.type,
        };
      }),
    );
}

export type { Character };
export { fetchCharacters };
