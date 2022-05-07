/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import people from "../img/Group 54.png";
import magnifyingGlass from "../img/Group 56.png";
import github from "../img/github-fill.png";
import linkin from "../img/linkedin-box-line.png";
import Ruby from "../img/Ellipse 4.png";
import Javier from "../img/Ellipse 4-1.png";
import Francisca from "../img/Ellipse 4-2.png";
import Rual from "../img/Ellipse 4-3.png";
import daimond from "../img/ruby-fill.png";
import Reactline from "../img/reactjs-line.png";



import "../App.css";

const HomePage = () => {

  return (
    <MainWrap>
      <LandingWrapper className="landingPage">
        <Heading className="">
          The place where you get <Span>that</Span> job
        </Heading>
        <P>
          With our Machine Learning algorithm you will get that job in no time.
          We promise you! Just give us the money and we will take care of it.
        </P>
        <Button> create an account now </Button>

        <div>
          <ImgPeople src={people} width="1000px" />
        </div>
      </LandingWrapper>

      <Section2 className="findYourNext">
        <WrapperS2 className="left-section">
          <TextWrap>
            <H1>Find your next job</H1>
            <p>
              Our Machine learning algorithm is so good that it's even illegal
              in some countries. Join us to use our barelly legal algorithm that
              is actually a group of interns that work on our basement.
            </p>
            <p>
              We have a job for you, no matter your background or previous
              experience. Is sending random memes through chat your only skill?
              That’s ok, we got you, our Rock Star Meme Curator role is here for
              you.
            </p>
          </TextWrap>
        </WrapperS2>

        <ImgWrapper className="right-section">
          <ImgWrap>
            <img src={magnifyingGlass} width="300px" />
          </ImgWrap>
        </ImgWrapper>
      </Section2>
      <Wrapper3>
        <H1S3>Meet the team</H1S3>
        <TeamWrapper>
          <div>
            <img src={Ruby} />
            <Name>Ruby Ramirez</Name>
            <Icon>
              <a href="#">
                {" "}
                <img src={github} />
              </a>
              <a href="#">
                {" "}
                <img src={linkin} />
              </a>
            </Icon>
          </div>
          <div>
            <img src={Javier} />
            <Name>Javier Escribano</Name>
            <Icon>
              <a href="#">
                {" "}
                <img src={github} />
              </a>
              <a href="#">
                {" "}
                <img src={linkin} />
              </a>
            </Icon>
          </div>
          <div>
            <img src={Francisca} />
            <Name>Francisca Reategui </Name>
            <Icon>
              <a href="#">
                {" "}
                <img src={github} />
              </a>
              <a href="#">
                {" "}
                <img src={linkin} />
              </a>
            </Icon>
          </div>
          <div>
            <img src={Rual} width="180px" />
            <Name>Raul Rubina</Name>
            <Icon>
              <a href="#">
                {" "}
                <img src={github} />
              </a>
              <a href="#">
                {" "}
                <img src={linkin} />
              </a>
            </Icon>
          </div>
        </TeamWrapper>
        <footer>
          <FooterWrap>
            <div>
              <p> © 2021 - Get That Job</p>
            </div>
            <div>
              <p> Source Code</p>
              <Inline>
                {" "}
                <img src={daimond} /> Ruby on Rails REST API
              </Inline>
              <Inline>
                {" "}
                <img src={Reactline} /> React Responsive SPA
              </Inline>
            </div>
            <div>
              <p> Codeable - Cohort 3 Final Project</p>
            </div>
          </FooterWrap>
        </footer>
      </Wrapper3>
    </MainWrap>
  );
};
const FooterWrap = styled.div`
  width: 100%;
  border-top: solid 2px var(--primary-brand-color);
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 18px;
`;
const Br = styled.br`
  border-top: solid 1px var(--primary-brand-color);
`;

const Inline = styled.p`
  display: inline;
  margin-left: 6px;
  line-height: 0;
  margin-bottom: 10px;
`;

const MainWrap = styled.main`
  width: 100vw;
  font-family: var(--primary-font);
`;

const LandingWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f5f5f6;
`;

const Heading = styled.h1`
  margin: 2rem 0;
  width: 500px;
  font-size: 60px;
  font-weight: 300;
`;

const Span = styled.span`
  color: var(--secoundary-brand-color);
`;

const P = styled.p`
  width: 600px;
  font-family: var(--primary-font);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 2rem;
`;
const Button = styled.button`
  display: block;
  width: 230px;
  height: 50px;
  border-radius: 15px;
  background-color: var(--secoundary-brand-color);
  border: none;
  color: white;
  margin-bottom: 50px;
`;
const ImgPeople = styled.img`
  margin-bottom: 50px;
`;

const Section2 = styled.section`
  width: 100%;
  height: 400px;
  display: flex;
  font-family: var(--primary-font);
`;
const H1 = styled.h1`
  font-size: 48px;
  font-weight: 400;
`;
const WrapperS2 = styled.div`
  width: 55%;
  padding: 30px;
  background-color: var(--primary-brand-color);
  color: white;
`;

const TextWrap = styled.div`
  width: 650px;
`;
const ImgWrapper = styled.div`
  width: 45%;
`;
const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 90px;
`;
const Wrapper3 = styled.section`
  width: 100%;
  height: 620px;
  background-color: #f5f5f6;
`;
const H1S3 = styled.h1`
  font-size: 48px;
  display: flex;
  justify-content: center;
  color: var(--primary-brand-color);
  font-weight: 400;
  padding-top: 30px;
  margin-bottom: 50px;
  margin-top: 0px;
`;

const TeamWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 80px;
`;

const Name = styled.h3`
  font-weight: 400;
  font-size: 24px;
  text-align: center;
`;

const Icon = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default HomePage;
