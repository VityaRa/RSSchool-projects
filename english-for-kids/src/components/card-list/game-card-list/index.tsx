import { getCurrentCardList, getRandomURL } from "../../../utils/functions";
import GameCard from "../../game-card";
import style from "../style.module.scss";

import { useParams } from "react-router-dom";
import GameButton from "../../button";
import { ICard } from "../../../types/entities";
import { useEffect } from "react";
import { randomizeList } from "../../../redux/reducers/gameReducer";
import { useDispatch } from "react-redux";
import GameScore from "../../game-score";

interface IProps {
  id: string;
}

const GameCardList = () => {
  const params = useParams<IProps>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(randomizeList(getRandomURL(getCurrentCardList(+params.id - 1))));
  }, []);
  return (
    <>
    <GameScore/>
      <ul className={style.list}>
        {getCurrentCardList(+params.id - 1).map(
          (info: ICard, index: number) => (
            <GameCard index={index} card={info} key={info.word} />
          )
        )}
      </ul>
      <GameButton />
    </>
  );
};

export default GameCardList;