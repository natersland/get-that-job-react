import styled from "@emotion/styled";
// Images ----------------------------
import logo from "../img/gtj-logo 1.png";
import loginLogo from "../img/user-add-line.png";
// Context ----------------------------
import { useNav } from "../contexts/navigate";

// NavLink Button Data ----------------------------
const navLink = [
  {
    icon: loginLogo,
    btn_text: "SIGN UP",
  },
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
              <Img src={btn.icon} /> {btn.btn_text}
            </button>
          );
        })}
      </NavLinkWrapper>
    </Wrap>
  );
};

const Img = styled.img`
  line-height: 2.7;
  padding-top: 3px;
`;

const BrandLogo = styled.img`
  cursor: pointer;
`;
const Wrap = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
  position: sticky;
  z-index: 2;
`;
const NavLinkWrapper = styled.div`
  display: flex;
`;

export default Navbar;
