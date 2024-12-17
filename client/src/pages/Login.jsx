import { FormRow, SubmitButton } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  async function loginDemoUser() {
    try {
      await axios.post("api/v1/auth/login", {
        email: "test@gmail.com",
        password: "pw123456",
      });
      toast.success("Welcome to our test version of the app");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Can't test the app for the moment");
      console.log(error);
    }
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--primary-500)",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          MERN Jobs Tracker
        </h1>
        <h4>Login</h4>
        <FormRow id="email" type="email">
          Email
        </FormRow>
        <FormRow id="password" type="password">
          Password
        </FormRow>
        <SubmitButton />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;

export async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    await axios.post("api/v1/auth/login", data);
    toast.success("Login Successful");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    // axios takes the error from the error response thrown by our server and put it under error.response.data
    // We added the || just in case the request doesn't reach our server
    toast.error(error?.response.data.message || "Failed to log in");
    return error;
  }
}
