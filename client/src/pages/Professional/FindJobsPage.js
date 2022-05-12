import styled from "@emotion/styled";

// Components
import FindThatJobCard from "../../components/AutPro-FindThatJob/FindThatJobCard";
import FindThatJobHeader from "../../components/AutPro-FindThatJob/FindThatJobHeader";

function FindJobsPage() {
  return (
    <Wrapper>
      <FindThatJobHeader />
      <FindThatJobCard />
    </Wrapper>
  );
}
export default FindJobsPage;

const Wrapper = styled.section`
  width: 65%;
  margin: auto;
`;
