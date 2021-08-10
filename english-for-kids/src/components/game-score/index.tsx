import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IMainState } from "../../types/redux-types";
import { WrongStar, RightStar } from "../../utils/icons";
import style from "./style.module.scss";

const GameScore = () => {
  const { scoreList } = useSelector((state: RootState) => state.game);

  return (
    <div
      className={style.container}
    >
      {scoreList.map((score, index) => (
        <div key={index}>{score ? <RightStar /> : <WrongStar />}</div>
      ))}
    </div>
  );
};

export default GameScore;
