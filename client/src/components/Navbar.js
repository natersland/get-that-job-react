import styled from "@emotion/styled";
import logo from "../img/gtj-logo 1.png";
import loginLogo from "../img/user-add-line.png";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Wrap className="wrapper">
      <div className="logo-wrapper">
        <img src={logo} />
      </div>
      <div className="nav-links">
        <Button>
          <Img src={loginLogo} /> SIGN UP
        </Button>
        <Button>
          <Img src={loginLogo} /> LOG IN
        </Button>
      </div>
    </Wrap>
  );
};

const Img = styled.img`
  line-height: 2.7;
  padding-top: 3px;
`;
const Wrap = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;

const Button = styled.button`
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: solid #ffc1e3 3px;
  border-radius: 15px;
  background-color: white;
  line-height: 24px;
  font-size: 14px;
  margin-left: 15px;
`;

export default Navbar;
