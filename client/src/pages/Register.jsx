import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, Form, redirect } from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
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
        <h4>Register</h4>
        <FormRow id="name">Name</FormRow>
        <FormRow id="lastName">Last Name</FormRow>
        <FormRow id="location">Location</FormRow>
        <FormRow id="email" type="email">
          Email
        </FormRow>
        <FormRow id="password" type="password">
          Password
        </FormRow>

        <SubmitButton />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;

export async function registerAction({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    await axios.post("api/v1/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response.data.message);
    return error;
  }
}
