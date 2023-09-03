import styled from "@emotion/styled";
// Images ----------------------------------------
import people from "../assets/people/group-people.svg";
import magnifyingGlass from "../assets/items/magni.svg";
import github from "../img/github-fill.png";
import linkin from "../img/linkedin-box-line.png";
// Data ----------------------------------------
import teamData from "../data/teamData";
import AlertDialog from "../components/Utilities/AlertDialog";
// ---------------------------------------------
const HomePage = () => {
  return (
    <MainWrap>
      <AlertDialog />
      <LandingWrapper className="landingPage ">
        <Heading>
          The place where <br></br>you get <Span>that</Span> job
        </Heading>
        <IntroParagraph>
          With our Machine Learning algorithm you will get that job in no time.
          <br></br>
          We promise you! Just give us the money and we will take care of it.
        </IntroParagraph>
        <ImgPeopleWrapper className="mb-12 mt-4">
          <img src={people} width="1400px" alt="group-of-people" />
        </ImgPeopleWrapper>
      </LandingWrapper>

      <Section2 className="findYourNext">
        <WrapperS2 className="left-section ">
          <TextWrap>
            <IntroHeader>Find your next job</IntroHeader>
            <p>
              Our Machine learning algorithm is so good that it's even illegal
              in some countries. Join us to use our barelly legal algorithm that
              is actually a group of interns that work on our basement.
              <br></br>
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
      <TeamSection>
        <TeamHeader>Meet the team</TeamHeader>
        <TeamWrapper>
          {teamData.map((member, index) => {
            const { avartar, name, github_url, linkin_link } = member;
            return (
              <TeamWrapperDetails key={index}>
                <AvartarImg src={avartar} alt={name} />
                <Name>{name}</Name>
                <Icon>
                  <a href={github_url} target="_blank" rel="noreferrer">
                    {" "}
                    <img src={github} alt="Github" className="mr-2" />
                  </a>
                  <a href={linkin_link} target="_blank" rel="noreferrer">
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
            <CreaditText>
              <p> © 2022 - Get That Job (Lasted update 24/06/2023)</p>
            </CreaditText>
          </FooterWrap>
        </footer>
      </TeamSection>
    </MainWrap>
  );
};

// Main Zone --------------------------------

const MainWrap = styled.main`
  width: 100%;
  font-family: var(--primary-font);
  padding-top: 8rem;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    padding: 0px 20px;
  }
`;

// Header Zone --------------------------------
const LandingWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f5f5f6;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    padding: 0 25px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    padding: 0 50px;
    margin-top: -100px;
  }
  /* Large devices (laptops/desktops, 912 and up) */
  @media only screen and (min-width: 912px) {
    margin-top: 100px;
  }
  /* Large devices (laptops/desktops, 1024 and up) */
  @media only screen and (min-width: 1024px) {
    margin-top: 200px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    margin-top: 100px;
  }
`;

const Heading = styled.h1`
  margin: 2rem 0;
  font-size: 60px;
  font-weight: 300;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin-top: 350px;
  }
`;
const Span = styled.span`
  color: var(--secoundary-brand-color);
`;

const IntroParagraph = styled.p`
  font-family: var(--primary-font);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 2rem;
  /* Large devices (laptops/desktops, 912 and up) */
  @media only screen and (min-width: 912px) {
    width: 75%;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 75%;
  }
  /* L
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 90%;
  }
`;

const ImgPeopleWrapper = styled.div``;
// Content Zone --------------------------------
const Section2 = styled.section`
  width: 100%;
  height: 472px;
  display: flex;
  font-family: var(--primary-font);
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-top: 200px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-top: -100px;
    flex-direction: column;
  }
  /* Large devices (laptops/desktops, 1024 and up) */
  @media only screen and (min-width: 1024px) {
    flex-direction: row;
    margin-top: 50px;
  }
`;
const IntroHeader = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  line-height: 58.51px;
  margin-bottom: 2rem;
`;
const WrapperS2 = styled.div`
  margin: 0 auto;
  background-color: var(--primary-brand-color);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    padding: 50px 0;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    padding: 50px 0;
  }
  /* Large devices (laptops/desktops, 1024 and up) */
  @media only screen and (min-width: 1024px) {
    width: 70%;
    padding: 100px 0;
  }
`;

const TextWrap = styled.div`
  width: 80%;
  font-size: 1.5rem;
  line-height: 29px;
`;
const ImgWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 50px 0;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    padding: 50px 0;
  }
  /* Large devices (laptops/desktops, 912 and up) */
  @media only screen and (min-width: 912px) {
    padding: 50px 0;
  }
  /* Large devices (laptops/desktops, 1024 and up) */
  @media only screen and (min-width: 1024px) {
    width: 30%;
    padding: 0 50px;
  }
`;
const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
`;
// Team Zone --------------------------------
const TeamSection = styled.section`
  width: 100%;
  background-color: #f5f5f6;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin-top: 720px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-top: 300px;
  }
  /* Large devices (laptops/desktops, 912 and up) */
  @media only screen and (min-width: 912px) {
    margin-top: 350px;
  }
  /* Large devices (laptops/desktops, 1024 and up) */
  @media only screen and (min-width: 1024px) {
    margin-top: 50px;
  }
`;
const TeamHeader = styled.h1`
  font-size: 48px;
  display: flex;
  justify-content: center;
  color: var(--primary-brand-color);
  font-weight: 400;
  padding-top: 30px;
  margin-bottom: 50px;
  margin-top: 0px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;

const TeamWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 80px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (max-width: 768px) {
    display: grid;
    flex-direction: column;
  }
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

// Footer Zone --------------------------------
const FooterWrap = styled.div`
  width: 100%;
  border-top: solid 2px var(--primary-brand-color);
  display: flex;
  text-align: center;
  font-size: 18px;
  padding: 15px 0;
`;
const CreaditText = styled.div`
  width: 100%;
`;

export default HomePage;
