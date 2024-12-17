import { useRouteError, Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    );
  }
  if (error.status === 400) {
    return (
      <Wrapper>
        <div>
          <h3>Invalid Values</h3>
          <p>{error.data.message}</p>
          <Link to="/register">back to register </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
