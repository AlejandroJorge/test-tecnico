import { useQuery } from "react-query";
import { fetchCharacters, type Character } from "./data/character";
import { Card } from "primereact/card";

import styled from "styled-components";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import { Button } from "primereact/button";

function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, data, isFetching } = useQuery(
    ["characters", currentPage],
    () => fetchCharacters(currentPage),
    { keepPreviousData: true },
  );

  if (isLoading || isFetching)
    return (
      <SpinnerContainer>
        <ProgressSpinner />
      </SpinnerContainer>
    );

  if (isError) return <div>There was an error</div>;

  return (
    <>
      <Container>
        <StyledPaginationBarContainer>
          <Button
            label="Prev"
            disabled={currentPage <= 1 || isFetching || isLoading}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          />
          <span>
            Current: {currentPage} / {data?.totalPages}
          </span>
          <Button
            label="Next"
            disabled={
              currentPage >= data!.totalPages || isFetching || isLoading
            }
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          />
        </StyledPaginationBarContainer>
        <ContentContainer>
          {data?.characters.map((character, idx) => (
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
