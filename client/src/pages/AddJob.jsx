import { FormRow, SubmitButton } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useDashboardContext } from "./DashboardLayout";
import { Form, redirect } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import SelectInput from "../components/SelectInput";
import axios from "axios";
import { toast } from "react-toastify";

const AddJob = () => {
  const { user } = useDashboardContext();

  return (
    <Wrapper>
      <Form method="post" action="." className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow id="company">Company</FormRow>
          <FormRow id="position">Position</FormRow>
          <FormRow id="jobLocation" defaultValue={user?.location}>
            Location
          </FormRow>

          <SelectInput
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            values={JOB_STATUS}
          >
            Job Status
          </SelectInput>
          <SelectInput
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            values={JOB_TYPE}
          >
            Job Type
          </SelectInput>

          <SubmitButton formBtn="form-btn" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;

export async function jobAction({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    await axios.post("api/v1/jobs", data);
    toast.success("Job added successfully");
    return redirect("all-jobs");
  } catch (error) {
    console.log(error);
    return toast.error(error.response.data.message || "Can't add job");
  }
}
