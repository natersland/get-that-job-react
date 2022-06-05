// Pictures ----------------------------------
import GitHubLogo from "../../img/github-fill.png";
import ReactLogo from "../../img/reactjs-line.png";
// Data ----------------------------------
import teamData from "../../data/teamData";

import styled from "@emotion/styled";
function AboutUs() {
  return (
    <div>
      <Copyright>© 2022 - Get That Job</Copyright>
      <p>
        Build with <Heart>❤</Heart> by:
      </p>
      <CoderName>
        {teamData.map((items, index) => {
          const { name, github_url } = items;
          return (
            <ListDetail key={index}>
              <a href={github_url} target="_blank" rel="noreferrer">
                <MiniIcon src={GitHubLogo} alt="Git Hub" />
              </a>
              <p>{name}</p>
            </ListDetail>
          );
        })}
      </CoderName>
      <p className="mt-2">Source code:</p>
      <ListDetail>
        <MiniIcon src={ReactLogo} alt="React Logo" />
        <p>React Responsive SPA</p>
      </ListDetail>
    </div>
  );
}
export default AboutUs;

const Heart = styled.span`
  color: var(--primary-brand-color);
`;
const CoderName = styled.div`
  display: flex;
  margin-top: 2px;
  flex-direction: column;
`;

const Copyright = styled.div`
  margin: 15px 0;
`;

const MiniIcon = styled.img`
  margin: 0.2rem 0.2rem 0.2rem 0;
  width: 17px;
  height: 17px;
`;

const ListDetail = styled.p`
  display: flex;
`;
