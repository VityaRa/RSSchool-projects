import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start } from "repl";

import { randomizeList, refreshScore, toggleGame } from "../../redux/reducers/gameReducer";
import { RootState } from "../../redux/store";
import { IMainState } from "../../types/redux-types";
import {
  delay,
  getCurrentCardList,
  getRandomURL,
  playSound,
} from "../../utils/functions";
import { Retry } from "../../utils/icons";
import style from "./style.module.scss";


const GameButton = () => {
  const { isGameStarted, wordList, currentWordIndex, isPlayMode } = useSelector(
    (state: RootState) => state.game
  );
  const dispatch = useDispatch();

  const startGame = () => {
    (async () => {
      dispatch(toggleGame()) 
      console.log(wordList);
      await delay(500);
    })();
  };

  const retry = () => {
    playSound(wordList[currentWordIndex]);
  };

  if (!isPlayMode) return null;

  return (
    <button
      className={style.button}
      onClick={
        !isGameStarted
          ? () => {
              startGame();
              retry();
            }
          : retry
      }
    >
      <>{!isGameStarted ? <span>Start Game</span> : <Retry />}</>
    </button>
  );
};

export default GameButton;
