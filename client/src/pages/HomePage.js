/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import people from "../img/Group 54.png";
import magnifyingGlass from "../img/Group 56.png";

import "../App.css";

const HomePage = () => {
  return (
    <MainWrap>
      <LandingWrapper className="landingPage">
        <Heading>
          The place where you get <Span>that</Span> job
        </Heading>
        <P>
          With our Machine Learning algorithm you will get that job in no time.
          We promise you! Just give us the money and we will take care of it.
        </P>
        <Button> create an account now </Button>
        <img src={people} width="1000px" />
      </LandingWrapper>
      <section className="findYourNext">
        <div>
          <h1>Find your next job</h1>
          <p>
            Our Machine learning algorithm is so good that it’s even illegal in
            some countries. Join us to use our barelly legal algorithm that is
            actually a group of interns that work on our basement. <br />
            We have a job for you, no matter your background or previous
            experience. Is sending random memes through chat your only skill?
            That’s ok, we got you, our Rock Star Meme Curator role is here for
            you.
          </p>
        </div>
        <div>
          <img src={magnifyingGlass} />
        </div>
      </section>

      <section className="findNextJob"></section>
    </MainWrap>
  );
};

const MainWrap = styled.main`
  width: 100vw;
`;

const LandingWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Heading = styled.h1`
  width: 500px;
  font-family: var(--primary-font: "Montserrat", sans-serif);
  font-size: 60px;
  font-weight: 300;
  justify-content: : center;
 
`;

const Span = styled.span`
  color: var(--secoundary-brand-color);
`;

const P = styled.p`
  width: 600px;
  font-family: var(--primary-font: "Montserrat", sans-serif);
  font-size: 24px;
  font-weight: 400;
`;
const Button = styled.button`
  width: 230px;
  height: 50px;
  border-radius: 15px;
  background-color: var(--secoundary-brand-color);
  border: none;
  color: white;
`;
export default HomePage;
