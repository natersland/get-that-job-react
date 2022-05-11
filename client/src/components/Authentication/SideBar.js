import styled from "@emotion/styled";
// Pictures
import BrandLogo from "../../img/gtj-logo-1.png";
import Jobposition from "../../img/briefcase-line.png";
import CreateJob from "../../img/file-add-line.png";
import UserProfile from "../../img/user-line.png";
import LogOut from "../../img/logout-circle-line.png";
import GitHubLogo from "../../img/github-fill.png";
import ReactLogo from "../../img/reactjs-line.png";
// Context
import { useNav } from "../../contexts/navigate";
// Data
import teamData from "../../data/teamData";

const navData = [
  {
    nav_icon: Jobposition,
    text_menu: "Job Positions",
  },
  {
    nav_icon: CreateJob,
    text_menu: "Create New Job",
  },
  {
    nav_icon: UserProfile,
    text_menu: "Profile",
  },
  {
    nav_icon: LogOut,
    text_menu: "Log Out",
  },
];

function Sidebar() {
  const { homePageRoute, sidebarLinkChecker, menuIndex } = useNav();

  return (
    <SidebarWrapper>
      <LogoWrapper>
        <Logo
          className="Logo"
          src={BrandLogo}
          alt="brand logo"
          onClick={() => {
            homePageRoute();
          }}
        ></Logo>
      </LogoWrapper>
      <Menu>
        {navData.map((items, index) => {
          const { nav_icon, text_menu } = items;
          return (
            <MenuList
              key={index}
              onClick={() => {
                sidebarLinkChecker(index);
              }}
              isActive={menuIndex}
            >
              <img src={nav_icon} alt={text_menu} />
              <MenuText>{text_menu}</MenuText>
            </MenuList>
          );
        })}
      </Menu>
      <CoderDetail>
        <Copyright>© 2022 - Get That Job</Copyright>
        <p>
          Build with <Heart>❤</Heart> by:
        </p>
        <CoderName>
          {teamData.map((items, index) => {
            const { name, github_url } = items;
            return (
              <ListDetail key={index}>
                <a href={github_url} target="_blank">
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
      </CoderDetail>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  width: 240px;
  height: 100vh;
  background-color: var(--tertiary-text-color);
  position: fixed;
`;
const LogoWrapper = styled.div`
  padding: 2rem 0;
  padding-left: 18px;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  height: 48px;
  height: 60vh;
  cursor: pointer;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: row;
  padding: 13px 0 13px 18px;

  &:nth-child(1) {
    background-color: ${(props) =>
      props.isActive === 1
        ? " RGB(245, 245, 246)"
        : "var(--tertiary-text-color)"};
  }
  &:nth-child(2) {
    background-color: ${(props) =>
      props.isActive === 2
        ? " RGB(245, 245, 246)"
        : "var(--tertiary-text-color)"};
  }
  &:nth-child(3) {
    background-color: ${(props) =>
      props.isActive === 3
        ? " RGB(245, 245, 246)"
        : "var(--tertiary-text-color)"};
  }
  &:nth-child(4) {
    background-color: ${(props) =>
      props.isActive === 4
        ? " RGB(245, 245, 246)"
        : "var(--tertiary-text-color)"};
  }
`;

const MenuText = styled.h2`
  margin-left: 10px;
`;

const Logo = styled.img`
  cursor: pointer;
`;

const CoderDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 13px 0 13px 18px;
  font-size: 0.85rem;
`;
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

export default Sidebar;
