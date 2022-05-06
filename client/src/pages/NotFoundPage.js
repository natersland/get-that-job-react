// tools
import styled from "@emotion/styled";

export default function NotFoundPage() {
  return (
    <ErrorWrapper>
      <ErrorIcon>👻</ErrorIcon>
      <ErrorText>Sorry. 404 Page Not Found</ErrorText>
    </ErrorWrapper>
  );
}

// CSS Zone
const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 90vh;
`;

const ErrorIcon = styled.p`
  font-size: 5rem;
  margin: 2rem;
`;

const ErrorText = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: var(--secoundary-color-hover);
`;
