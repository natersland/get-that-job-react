import styled from "@emotion/styled";
// Components
import AlertNotification from "./misc/AlertNotification";
import CloseButton from "./misc/ButtonTest";
const ComponentIndex = () => {
  return (
    <Wrapper>
      <Section>
        <SectionHeader>Notification</SectionHeader>
        <ComponentZone>
          <ComponentLabel>Component Name: AlertNotification</ComponentLabel>
          <AlertNotification text="insert text here" />
        </ComponentZone>
      </Section>
      <Section>
        <SectionHeader>Notification</SectionHeader>
        <ComponentZone>
          <ComponentLabel>Component Name: AlertNotification</ComponentLabel>
          <CloseButton/>
        </ComponentZone>
      </Section>
    </Wrapper>
  );
};
export default ComponentIndex;

const Wrapper = styled.div`
  width: 60%;
  margin: auto;
`;
const Section = styled.div`
  padding-top: 80px;
`;
const SectionHeader = styled.h1`
  font-weight: 500;
  text-decoration: underline;
`;
const ComponentLabel = styled.p`
  font-size: 0.8rem;
  margin-top: 1rem;
`;
const ComponentZone = styled.div``;
