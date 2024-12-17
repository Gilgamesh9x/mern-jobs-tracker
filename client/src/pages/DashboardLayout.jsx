import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar, Loading } from "../components";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardContext = createContext();

const Dashboard = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  // Load the user data from the loader
  const { user } = useLoaderData();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  // Simulate loading data (you might fetch from API here in a real case)
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.get("api/v1/auth/logout");
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
      console.log(error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;

export async function dashboardLoader() {
  try {
    const { data } = await axios.get("/api/v1/users/current-user");
    return data; // return the user data
  } catch (error) {
    return redirect("/");
  }
}
