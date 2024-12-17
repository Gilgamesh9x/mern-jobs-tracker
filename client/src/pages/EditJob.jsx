import axios from "axios";
import { useLoaderData, Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitButton } from "../components";
import SelectInput from "../components/SelectInput";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";

const EditJob = () => {
  const { job } = useLoaderData();

  return (
    <Wrapper>
      <Form method="patch" action="." className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow id="company" defaultValue={job.company}>
            Company
          </FormRow>
          <FormRow id="position" defaultValue={job.position}>
            Position
          </FormRow>
          <FormRow id="jobLocation" defaultValue={job.jobLocation}>
            Location
          </FormRow>

          <SelectInput
            name="jobStatus"
            defaultValue={job.jobStatus}
            values={JOB_STATUS}
          />
          <SelectInput
            name="jobType"
            defaultValue={job.jobType}
            values={JOB_TYPE}
          />

          <SubmitButton formBtn="form-btn" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

export async function editJobLoader({ params }) {
  const jobId = params.jobId;
  try {
    const { data } = await axios.get(`/api/v1/jobs/${jobId}`);
    return data;
  } catch (error) {
    console.log(error);
    return redirect("/dashboard/all-jobs");
  }
}

export async function editJobAction({ request, params }) {
  const jobId = params.jobId;
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  try {
    await axios.patch(`/api/v1/jobs/${jobId}`, data);
    toast.success("Job Edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    console.log(error);
    return toast.error(error.response.data.message || "Can't add job");
  }
}
