import styled from "@emotion/styled";
import logo from "../img/gtj-logo 1.png";
import loginLogo from "../img/user-add-line.png";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Wrap className="shadow">
      <div className="logo-wrapper">
        <img src={logo} />
      </div>
      <NavLinkWrapper className="nav-links">
        <button className="btn btn-md btn-white pink-border">
          <Img src={loginLogo} /> SIGN UP
        </button>
        <button className="btn btn-md btn-white pink-border ml-4">
          <Img src={loginLogo} /> LOG IN
        </button>
      </NavLinkWrapper>
    </Wrap>
  );
};

const Img = styled.img`
  line-height: 2.7;
  padding-top: 3px;
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
  position:sticky;
  z-index: 2;
`;
const NavLinkWrapper = styled.div`
display: flex;
`

export default Navbar;
