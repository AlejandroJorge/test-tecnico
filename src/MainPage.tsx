import { useCharacters, type Character } from "./data/character";
import { Card } from "primereact/card";

import styled from "styled-components";
import { ProgressSpinner } from "primereact/progressspinner";

function MainPage() {
  const { data, status } = useCharacters();

  if (status === "PROCESSING")
    return (
      <SpinnerContainer>
        <ProgressSpinner />
      </SpinnerContainer>
    );

  if (status === "ERROR") return <div>There was an error</div>;

  return (
    <>
      <Container>
        <ContentContainer>
          {data?.characters.map((character: Character, idx: number) => (
            <CharacterCard key={idx} character={character} />
          ))}
        </ContentContainer>
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
      style={{ minWidth: "15rem", maxWidth: "15rem", minHeight: "32rem" }}
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
  gap: 1rem;
  flex-direction: column;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30rem;
`;

const StyledPaginationBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export default MainPage;
