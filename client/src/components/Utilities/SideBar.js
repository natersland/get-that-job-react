import styled from "@emotion/styled";
// Pictures -------------------------------------
import BrandLogo from "../../img/gtj-logo-1.png";
import Jobposition from "../../img/briefcase-line.png";
import CreateJob from "../../img/file-add-line.png";
import UserProfile from "../../img/user-line.png";
import LogOut from "../../img/logout-circle-line.png";
import BackDropLoading from "./BackDropLoading";

// Pro NavBar Pictures ----------------------------
import MagnigyGlassIcon from "../../assets/search-line.svg";
import DocIcon from "../../assets/article-line.svg";
import FocusIcon from "../../assets/focus-3-line.svg";
import ProfileIcon from "../../assets/user-line.svg";
// Context -------------------------------------
import { useNav } from "../../contexts/navigate";
// Components
import AboutUs from "./AboutUs";
import { useVadilation } from "../../contexts/vadilation";

const navProData = [
  {
    nav_icon: MagnigyGlassIcon,
    text_menu: "Find that job",
  },
  {
    nav_icon: DocIcon,
    text_menu: "Your applications",
  },
  {
    nav_icon: FocusIcon,
    text_menu: "Following",
  },
  {
    nav_icon: ProfileIcon,
    text_menu: "Profile",
  },
  {
    nav_icon: LogOut,
    text_menu: "Log Out",
  },
];
const navRecData = [
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

function Sidebar({ barRole }) {
  const { homePageRoute, sidebarLinkChecker, menuIndex } = useNav();
  return (
    <SidebarWrapper>
      <BackDropLoading />
      <LogoWrapper>
        <Logo
          className="Logo"
          src={BrandLogo}
          alt="brand logo"
          onClick={() => {
            homePageRoute();
            localStorage.removeItem("jobId");
          }}
        ></Logo>
      </LogoWrapper>
      <Menu>
        {barRole === "professional"
          ? navProData.map((items, index) => {
              const { nav_icon, text_menu } = items;
              return (
                <MenuList
                  key={index}
                  onClick={() => {
                    sidebarLinkChecker(index, "professional");
                  }}
                  isActive={menuIndex}
                >
                  <img src={nav_icon} alt={text_menu} />
                  <MenuText>{text_menu}</MenuText>
                </MenuList>
              );
            })
          : navRecData.map((items, index) => {
              const { nav_icon, text_menu } = items;
              return (
                <MenuList
                  key={index}
                  onClick={() => {
                    sidebarLinkChecker(index, "recruiter");
                  }}
                  isActive={menuIndex}
                >
                  <img src={nav_icon} alt={text_menu} />
                  <MenuText>{text_menu}</MenuText>
                </MenuList>
              );
            })}
      </Menu>
      <SidebarFooter>
        {barRole === "professional" ? (
          <Copyright>© 2022 - Get That Job</Copyright>
        ) : (
          <AboutUs />
        )}
      </SidebarFooter>
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

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 13px 0 13px 18px;
  height: 28vh;
  font-size: 0.85rem;
`;

const Copyright = styled.div`
  margin: 15px 0;
`;
export default Sidebar;
