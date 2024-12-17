import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const { data } = await axios.get("/api/v1/jobs/jobs-stats");
    return data;
  },
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { results, monthyAppsData } = data;

  return (
    <>
      <StatsContainer results={results} />
      {monthyAppsData?.length > 0 && <ChartsContainer data={monthyAppsData} />}
    </>
  );
};

export default Stats;

// using this, we're combining the loader functionality and tanstack
// tanstack will cache data for us which is important and we can use it alone in the component, but we'll have to handle isLoading and isError in each page
// if we use the loader and tanstack, the loader takes care of the error and loading functionality
// so it's up to me what I wanna implement
export async function jobsStatsLoader(queryClient) {
  return await queryClient.ensureQueryData(statsQuery);
}
