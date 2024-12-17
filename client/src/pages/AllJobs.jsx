import { JobsContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import axios from "axios";

const JobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <JobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </JobsContext.Provider>
  );
};

export const useJobsContext = () => useContext(JobsContext);

export default AllJobs;

export async function jobsLoader({ request }) {
  // this will return an object with key value pairs of the query and its value
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  /* console.log(params); */
  const { data } = await axios.get("/api/v1/jobs", { params });
  return { data, searchValues: { ...params } };
}
