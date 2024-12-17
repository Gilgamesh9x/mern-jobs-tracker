import axios from "axios";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { StatItem } from "../components";

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;

export async function appStatsLoader() {
  const { data } = await axios.get("/api/v1/users/admin/app-stats");
  return data; // return the user data
}
