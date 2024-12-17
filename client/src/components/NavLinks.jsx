import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = (isBigSidebar) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (text === "admin" && user.role !== "admin") {
          return null;
        }
        return (
          <NavLink
            onClick={isBigSidebar ? null : toggleSidebar}
            to={path}
            key={text}
            className={"nav-link"}
            end // we added end so that in the first link that matches the main dashboard url, we don't always get the active styling there
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
