import { useQuery } from "react-query";
import { fetchCharacters, type Character } from "./data/character";
import { Card } from "primereact/card";

import styled from "styled-components";

function MainPage() {
  const { isLoading, error, data } = useQuery("characters", fetchCharacters);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <>
      <Container>
        {data?.map((character, idx) => (
          <CharacterCard key={idx} character={character} />
        ))}
      </Container>
    </>
  );
}

function CharacterCard({ character }: { character: Character }) {
  const header = <img src={character.img} alt={character.name} />;

  return (
    <Card
      title={character.name}
      header={header}
      style={{ minWidth: "15rem", maxWidth: "15rem" }}
    >
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      {character.type && <p>Type: {character.type}</p>}
    </Card>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 75%;
  margin: auto;
`;

export default MainPage;
