import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "react-router-dom";

const DeleteJob = () => {
  return;
};

export default DeleteJob;

export async function deleteJobAction({ params }) {
  const jobId = params.jobId;
  try {
    await axios.delete(`/api/v1/jobs/${jobId}`);
    toast.success("Job deleted successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || "Can't delete job");
    return redirect("/dashboard/all-jobs");
  }
}
