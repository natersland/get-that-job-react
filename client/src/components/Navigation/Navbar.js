import styled from "@emotion/styled";
// Images ----------------------------
import logo from "../../assets/logo/gtj-logo 1.svg";
import loginLogo from "../../img/user-add-line.png";
// Context ----------------------------
import { useNav } from "../../contexts/navigate";

// NavLink Button Data ----------------------------
const navLink = [
  // {
  //   icon: loginLogo,
  //   btn_text: "SIGN UP",
  // },
  {
    icon: loginLogo,
    btn_text: "LOG IN",
  },
];
// ------------------------------------------------
const Navbar = () => {
  const { navBarLinkChecker, homePageRoute } = useNav();
  return (
    <Wrap className="shadow-medium">
      <div className="logo-wrapper">
        <BrandLogo
          src={logo}
          alt="brand logo"
          onClick={() => {
            homePageRoute();
          }}
        ></BrandLogo>
      </div>
      <NavLinkWrapper className="nav-links">
        {navLink.map((btn, index) => {
          return (
            <button
              key={btn}
              className="btn btn-md btn-white pink-border mr-4"
              onClick={() => {
                navBarLinkChecker(index);
              }}
            >
              <IconImage src={btn.icon} /> {btn.btn_text}
            </button>
          );
        })}
      </NavLinkWrapper>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-around;
  padding: 15px;
  position: fixed;
  z-index: 9;
`;
const BrandLogo = styled.img`
  cursor: pointer;
`;
const IconImage = styled.img`
  line-height: 2.7;
  padding-top: 3px;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: 600px) {
    visibility: hidden;
  }
`;

export default Navbar;
