import styled from "@emotion/styled";
import FindMultiverse from "../../components/AutPro-FindThatJob/FindMultiverse";
import FindMultiverse2 from "../../components/AutPro-FindThatJob/FindMultiverse2";
// Components
import FindThatJobCard from "../../components/AutPro-FindThatJob/FindThatJobCard";
import AlertDialog from "../../components/Utilities/AlertDialog";

function MultiFindJob() {
  const userRole = localStorage.getItem("role");

  return (
    <Wrapper>
      <AlertDialog textDialog={`Login successful! Welcome ${userRole}`} />
      <FindMultiverse />
      <FindThatJobCard />
    </Wrapper>
  );
}
export default MultiFindJob;

const Wrapper = styled.section`
  width: 65%;
  margin: auto;
  margin-bottom: 100px;
`;
