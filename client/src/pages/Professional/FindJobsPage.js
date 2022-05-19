import styled from "@emotion/styled";
// Components
import FindThatJobCard from "../../components/AutPro-FindThatJob/FindThatJobCard";
import FindThatJobHeader from "../../components/AutPro-FindThatJob/FindThatJobHeader";
import AlertDialog from "../../components/Utilities/AlertDialog";

function FindJobsPage() {
  const userRole = localStorage.getItem("role");

  return (
    <Wrapper>
      <AlertDialog textDialog={`Login successful! Welcome ${userRole}`} />
      <FindThatJobHeader />
      <FindThatJobCard />
    </Wrapper>
  );
}
export default FindJobsPage;

const Wrapper = styled.section`
  width: 65%;
  margin: auto;
  margin-bottom: 100px;
`;
