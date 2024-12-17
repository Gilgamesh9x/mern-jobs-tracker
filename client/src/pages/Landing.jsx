import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/LandingPage";

import main from "../assets/images/main.svg";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--primary-500)",
          }}
        >
          MERN Jobs Tracker
        </h1>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Track and manage your job applications with ease. Stay organized and
            never miss an opportunity!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
