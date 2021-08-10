import { useDispatch, useSelector } from "react-redux";
import { toggleGame, togglePlayMode } from "../../redux/reducers/gameReducer";
import { RootState } from "../../redux/store";
import style from "./style.module.scss";
import Inner from "./text";

const SwitchButton = () => {
  const dispatch = useDispatch();
  const { isGameStarted } = useSelector((state: RootState) => state.game);
  return (
    <div
      className={style.container}
      onClick={() => {
        dispatch(togglePlayMode());
        if (isGameStarted) dispatch(toggleGame());
      }}
    >
      <Inner />
    </div>
  );
};

export default SwitchButton;
