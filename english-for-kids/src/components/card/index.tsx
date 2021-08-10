import { ICard } from "../../types/entities";
import style from "./style.module.scss";

interface IProps {
  card: ICard;
  index: number;
}

const Card = ({ card, index }: IProps) => {
  return (
    <li
      className={style.container}
    >
      <div className={style.image_wrapper}>
        <img src={card.image} alt="card_image" />
      </div>
    </li>
  );
};

export default Card;
