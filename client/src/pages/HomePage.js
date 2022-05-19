import styled from "@emotion/styled";
// Images ----------------------------------------
import people from "../assets/people/group-people.svg";
import magnifyingGlass from "../assets/items/magni.svg";
import github from "../img/github-fill.png";
import linkin from "../img/linkedin-box-line.png";
import daimond from "../img/ruby-fill.png";
import Reactline from "../img/reactjs-line.png";
// Contexts ----------------------------------------
import { useNav } from "../contexts/navigate";
import { useVadilation } from "../contexts/vadilation";
// Data
import teamData from "../data/teamData";
import AlertDialog from "../components/Utilities/AlertDialog";
// ---------------------------------------------
const HomePage = () => {
  const { registerRoute } = useNav();
  const { setIsAlert } = useVadilation();
  return (
    <MainWrap>
      <AlertDialog
        textDialog={`Created accout successfully! Welcom to Get That Job!`}
      />
      <LandingWrapper className="landingPage">
        <Heading>
          The place where you get <Span>that</Span> job
        </Heading>
        <P>
          With our Machine Learning algorithm you will get that job in no time.
          We promise you! Just give us the money and we will take care of it.
        </P>
        <button
          className="btn btn-lg btn-pink mb-8"
          onClick={() => {
            registerRoute();
          }}
        >
          {" "}
          create an account now{" "}
        </button>

        <div className="mb-12 mt-4">
          <ImgPeople src={people} width="1400px" />
        </div>
      </LandingWrapper>

      <Section2 className="findYourNext mt-20">
        <WrapperS2 className="left-section">
          <TextWrap>
            <H1>Find your next job</H1>
            <p>
              Our Machine learning algorithm is so good that it's even illegal
              in some countries. Join us to use our barelly legal algorithm that
              is actually a group of interns that work on our basement.<br></br>
              <p className="mt-8">
                We have a job for you, no matter your background or previous
                experience. Is sending random memes through chat your only
                skill? That’s ok, we got you, our Rock Star Meme Curator role is
                here for
              </p>
              you.
            </p>
          </TextWrap>
        </WrapperS2>

        <ImgWrapper className="right-section">
          <ImgWrap>
            <img src={magnifyingGlass} width="300px" alt="magnifyingGlass" />
          </ImgWrap>
        </ImgWrapper>
      </Section2>
      <Wrapper3>
        <H1S3>Meet the team</H1S3>
        <TeamWrapper>
          {teamData.map((member, index) => {
            const { avartar, name, github_url, linkin_link } = member;
            return (
              <TeamWrapperDetails key={index}>
                <AvartarImg src={avartar} alt={name} />
                <Name>{name}</Name>
                <Icon>
                  <a href={github_url} target="_blank">
                    {" "}
                    <img src={github} alt="Github" className="mr-2" />
                  </a>
                  <a href={linkin_link} target="_blank">
                    {" "}
                    <img src={linkin} alt="Linkedin" />
                  </a>
                </Icon>
              </TeamWrapperDetails>
            );
          })}
        </TeamWrapper>
        <footer>
          <FooterWrap>
            <div>
              <p> © 2021 - Get That Job</p>
            </div>
            <div>
              <Inline>
                <span>
                  <img src={Reactline} alt="Reactline" />{" "}
                </span>
                React Responsive
              </Inline>
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
  padding: 15px 0;
`;

const Inline = styled.p`
  display: flex;
`;

const MainWrap = styled.main`
  width: 100%;
  font-family: var(--primary-font);
  padding-top: 4rem;
`;

const LandingWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f5f5f6;
  padding-top: 100px;
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

const ImgPeople = styled.img``;

const Section2 = styled.section`
  width: 100%;
  height: 472px;
  display: flex;
  font-family: var(--primary-font);
`;
const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  line-height: 58.51px;
  margin-bottom: 2rem;
`;
const WrapperS2 = styled.div`
  width: 70%;
  margin: 0 auto;
  background-color: var(--primary-brand-color);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextWrap = styled.div`
  width: 80%;
  font-size: 1.5rem;
  line-height: 29px;
`;
const ImgWrapper = styled.div`
  width: 30%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper3 = styled.section`
  width: 100%;
  background-color: #f5f5f6;
  margin-top: 75px;
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
const TeamWrapperDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
`;

const AvartarImg = styled.img`
  width: 50%;
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
