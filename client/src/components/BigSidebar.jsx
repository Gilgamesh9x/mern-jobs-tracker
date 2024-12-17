import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${!showSidebar ? "show-sidebar" : ""}`}
      >
        <div className="content">
          <header>
            {" "}
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "var(--primary-500)",
              }}
            >
              MERN Jobs Tracker
            </h1>
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
