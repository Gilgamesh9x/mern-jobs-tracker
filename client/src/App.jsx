import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { jobAction } from "./pages/AddJob";
import { editJobAction } from "./pages/EditJob";
import { deleteJobAction } from "./pages/DeleteJob";
import { updateProfileAction } from "./pages/Profile";

import { dashboardLoader } from "./pages/DashboardLayout";
import { jobsLoader } from "./pages/AllJobs";
import { editJobLoader } from "./pages/EditJob";
import { appStatsLoader } from "./pages/Admin";
import { jobsStatsLoader } from "./pages/Stats";

import ErrorElement from "./components/ErrorElement";

import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  DeleteJob,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";

// we moved this here so we can use it on different routes

export function checkDefaultTheme() {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true" || false;
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
}

/* const isDarkThemeEnabled = checkDefaultTheme(); */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: jobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: jobsLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "edit-job/:jobId",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:jobId",
            element: <DeleteJob />,
            action: deleteJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: () => jobsStatsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: updateProfileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: appStatsLoader,
            errorElement: <ErrorElement />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
