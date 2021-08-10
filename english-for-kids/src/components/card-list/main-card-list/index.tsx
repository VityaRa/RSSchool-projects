import { IRef } from "../../../types/entities";
import { getMainPageData } from "../../../utils/functions";
import NavCard from "../../nav-card";
import style from "../style.module.scss";

const MainCardList = () => {
  return (
    <ul className={style.list}>
      {getMainPageData().map((info: IRef, index: number) => (
        <NavCard info={info} key={info.title} index={index} />
      ))}
    </ul>
  );
};

export default MainCardList;
