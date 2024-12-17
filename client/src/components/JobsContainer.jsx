import Job from "./Job";
import { useJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const { data } = useJobsContext();
  const { jobs, totalJobs, totalPages } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{totalJobs > 1 && "s"} Found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {totalPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
