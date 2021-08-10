import classNames from "classnames";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { randomizeList, toggleGame } from "../../redux/reducers/gameReducer";
import { toggleSidebar } from "../../redux/reducers/modalReducer";
import { RootState } from "../../redux/store";
import { IRef } from "../../types/entities";
import { IMainState } from "../../types/redux-types";
import { refs } from "../../utils/data";
import {  getCurrentCardList, getRandomURL } from "../../utils/functions";
import style from "./style.module.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isGameStarted } = useSelector((state: RootState) => state.game);
  const { isActiveSidebar } = useSelector((state: RootState) => state.modal);

  const ref = useRef(null);
  // useOutsideClick(ref);

  return (
    <ul
      ref={ref}
      className={classNames(style.sidebar, isActiveSidebar ? style.active : "")}
    >
      {refs.map((ref: IRef, index: number) => (
        <Link to={ref.endpoint} key={index}>
          <li
            className={style.list_elem}
            onClick={() => {
              // dispatch(toggleSidebar());
              if (ref.imageSrc) dispatch(randomizeList(getRandomURL(getCurrentCardList(index - 1))))
              if (isGameStarted) toggleGame();
            }}
          >
            <p className={style.text}>{ref.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Sidebar;
