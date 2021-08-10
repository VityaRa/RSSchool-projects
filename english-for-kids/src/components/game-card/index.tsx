import classNames from "classnames";
import { resolve } from "dns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delay, playSound, saveState } from "../../utils/functions";
import style from "../card/style.module.scss";
import listStyle from "../card-list/style.module.scss";
import BackSide from "./back";
import FrontSide from "./front";
import {
  addRightAnswer,
  addWrongAnswer,
  refreshScore,
  setErrors,
  toggleGame,
  togglePlayMode,
} from "../../redux/reducers/gameReducer";
import {
  toggleModalFailure,
  toggleModalSmile,
} from "../../redux/reducers/modalReducer";
import { IMainState } from "../../types/redux-types";
import { ICard, IDataCard } from "../../types/entities";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router";
import {
  addRightStatistics,
  addWrongStatistics,
} from "../../redux/reducers/cardReducer";

interface IProps {
  card: ICard;
  index: number;
}

const GameCard = ({ card, index }: IProps) => {
  const [isFlipped, setFlipped] = useState(false);
  const [isActive, setActive] = useState(true);
  const { isPlayMode, isGameStarted, wordList, currentWordIndex, scoreList } =
    useSelector((state: RootState) => state.game);

  const cards = useSelector((state: RootState) => state.cards);
  const history = useHistory();

  const dispatch = useDispatch();

  const restartGame = () => {
    dispatch(toggleGame());
    dispatch(togglePlayMode());
    dispatch(refreshScore());

    setActive(true);
  };

  return (
    <li
      className={classNames(
        style.container,
        listStyle.item,
        !isActive ? style.unactive : "",
        isPlayMode ? style.active_container : ""
      )}
      onMouseLeave={() => {
        if (isFlipped) setFlipped(!isFlipped);
      }}
      onClick={(e) => {
        //refactor!!!
        if (!isFlipped && !isPlayMode) playSound(card.audioSrc);
        if (
          (e.target as HTMLElement).tagName === "svg" ||
          (e.target as HTMLElement).tagName === "path"
        )
          setFlipped(!isFlipped);

        if (isGameStarted) {
          if (currentWordIndex === wordList.length - 1) {
            dispatch(addRightAnswer());
            history.push("/");
            const lastIndex = cards.findIndex(
              (elem: IDataCard) => elem.audioSrc === card.audioSrc
            );
            dispatch(addRightStatistics(lastIndex));
            playSound(`audio/correct.mp3`);
            
            saveState(cards)  
            if (scoreList.every((elem: boolean) => elem)) {
              (async () => {
                dispatch(toggleModalSmile());
                await delay(2000);
                dispatch(toggleModalSmile());
              })();
            } else {
              (async () => {
                const errors = scoreList.filter(
                  (elem: boolean) => !elem
                ).length;
                dispatch(toggleModalFailure());
                dispatch(setErrors(errors));
                await delay(2000);
                dispatch(toggleModalFailure());
              })();
            }
            restartGame();
            return;
          }
          const index = cards.findIndex(
            (elem: IDataCard) => elem.audioSrc === card.audioSrc
          );

          if (card.audioSrc === wordList[currentWordIndex]) {
            setActive(false);
            dispatch(addRightAnswer());

            dispatch(addRightStatistics(index));
            playSound(`audio/correct.mp3`);
            playSound(wordList[currentWordIndex + 1]);
          } else {
            playSound(`audio/error.mp3`);
            dispatch(addWrongStatistics(index));

            dispatch(addWrongAnswer());
          }
          saveState(cards)
        }
      }}
    >
      <div className={classNames(style.card, isFlipped ? style.flipped : "")}>
        <FrontSide isFlipped={isFlipped} card={card} />
        <BackSide isFlipped={isFlipped} card={card} />
      </div>
    </li>
  );
};

export default GameCard;
