import { AboutUsProps } from "./types";
import CreatorImage from "./CreatorImage";

const AboutUs = ({ windowWidth }: AboutUsProps): JSX.Element => {
  return (
    <div style={{ lineHeight: 2, letterSpacing: "0.5px" }}>
      <h3 className="aboutUsHeader">Meet the Team</h3>
      <div>
        We're Kilian Calefice and Maximilian Ebert, two software developers with
        a shared passion for economics and data visualization. Our journey
        started as a small hobby project, and we'd like to tell you a bit about
        it.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: windowWidth > 600 ? "row" : "column",
          alignItems: "center",
          marginTop: "15px",
          gap: "40px",
          justifyContent: "center",
        }}
      >
        <CreatorImage
          name="Kilian"
          linkedinLink="https://www.linkedin.com/in/kilian-calefice-825869272/"
        />
        <CreatorImage
          name="Max"
          linkedinLink="https://www.linkedin.com/in/maximilian-ebert-617075261/"
        />
      </div>
      <h3 className="aboutUsHeader">Why We Chose This Project</h3>
      <div>
        Our hobby project came to life because we wanted to make economic data
        more approachable. We believe that even small-scale efforts can
        contribute to making complex information more understandable. Our
        primary goal is to present economic data in a clear and visually
        engaging way. We aim to create visuals that anyone can enjoy, regardless
        of their background in economics. This project allows us to explore our
        interests and improve our skills in data visualization. We're just two
        individuals on a learning journey, and we're excited to share our
        progress with you.
      </div>
      <h3 className="aboutUsHeader">Join Us On Our Journey</h3>
      <div>
        We invite you to be a part of our modest endeavor to make economics more
        accessible. Take a look at our work, share your thoughts, or simply
        reach out to chat. Together, let's make economics a bit friendlier.
      </div>
    </div>
  );
};

export default AboutUs;
