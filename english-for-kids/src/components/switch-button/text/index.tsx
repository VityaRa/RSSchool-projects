import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IMainState } from "../../../types/redux-types";
import style from "./style.module.scss";

const Inner = () => {
  const { isPlayMode } = useSelector((state: RootState) => state.game);

  return (
    <div className={classNames(style.inner, isPlayMode ? style.active : "")}>
      <div className={style.circle}></div>
      <span className={style.text}>{isPlayMode ? "PLAY" : "TRAIN"}</span>
    </div>
  );
};

export default Inner;
