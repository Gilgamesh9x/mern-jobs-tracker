import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useDashboardContext } from "./DashboardLayout";
import { useNavigation, Form } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { user } = useDashboardContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="patch" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow id="name" defaultValue={name}>
            Name
          </FormRow>
          <FormRow id="lastName" defaultValue={lastName}>
            Last Name
          </FormRow>
          <FormRow id="email" type="email" defaultValue={email}>
            Email
          </FormRow>
          <FormRow id="location" defaultValue={location}>
            Last Name
          </FormRow>
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;

export async function updateProfileAction({ request }) {
  const formData = await request.formData();

  const file = formData.get("avatar");
  if (file?.size > 500000) {
    // 500000 is 0.5 mb
    toast.error("Image size too large");
    return null;
  }

  try {
    await axios.patch("/api/v1/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Failed to update profile.");
  }
  return null;
}
