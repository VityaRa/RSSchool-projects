import { useLocation } from "react-router";
import SidebarButton from "../checkbox";
import SwitchButton from "../switch-button";
import style from "./style.module.scss";

const Actions = () => {
  const location = useLocation();
  if (location.pathname.split("/").includes("admin")) return null;
  return (
    <div className={style.actions}>
      <SidebarButton />
      {location.pathname !== "/stats" && <SwitchButton />}
    </div>
  );
};

export default Actions;
