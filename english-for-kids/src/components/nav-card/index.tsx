import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { randomizeList } from "../../redux/reducers/gameReducer";
import { IRef } from "../../types/entities";
import {
  getRandomURL,
  getCurrentCardList,
} from "../../utils/functions";
import style from "../card/style.module.scss";

interface IProps {
  info: IRef;
  index: number;
}

const NavCard = ({ info, index }: IProps) => {
  const dispatch = useDispatch();
  return (
    <li
      className={style.container}
      onClick={() => {
        dispatch(randomizeList(getRandomURL(getCurrentCardList(index))))
      }}
    >
      <Link to={info.endpoint}>
        <div className={style.image_wrapper}>
          <img
            src={`${process.env.PUBLIC_URL}/${info.imageSrc}`}
            alt="card_image"
          />
        </div>
        <div className={style.title_wrapper}>
          <span>{info.title}</span>
        </div>
      </Link>
    </li>
  );
};

export default NavCard;

