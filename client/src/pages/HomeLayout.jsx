import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <h1>Navbar</h1>;
      <Outlet />
    </>
  );
};

export default HomeLayout;
