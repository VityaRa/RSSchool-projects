import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/reducers/modalReducer";
import { IMainState } from "../../types/redux-types";
import "./style.scss";

import { RootState } from "../../redux/store/index"

const SidebarButton = () => {
  const dispatch = useDispatch();
  const { isActiveSidebar } = useSelector((state: RootState) => state.modal);

  return (
    <div className={"sidebar__container"}>
      <label
        className={classNames(
          "sidebar__btn",
          "checkbox",
          isActiveSidebar ? "active" : ""
        )}
        htmlFor="sidebar__toggle"
        onClick={() => {
          if (!isActiveSidebar) dispatch(toggleSidebar()) 
        }}
      >
        <span></span>
      </label>
    </div>
  );
};

export default SidebarButton;
