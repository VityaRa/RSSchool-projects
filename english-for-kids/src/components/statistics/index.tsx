import { useEffect, useState } from "react";
import StatisticsItem from "./statistics-item";
import style from "./style.module.scss";
import { IDataCard } from "../../types/entities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { refreshScore } from "../../redux/reducers/gameReducer";
import { LOCAL_ITEM } from "../../utils/constants";
import { refreshStatistics, sortTable } from "../../redux/reducers/cardReducer";

const colomnTitle: string[] = [
  "Word",
  "Translation",
  "Category",
  "Clicks",
  "Correct",
  "Wrong",
  "%",
];

export default function Statistics() {
  const [data, setData] = useState<IDataCard[]>([]);
  const cards = useSelector((state: RootState) => state.cards)

  const dispatch = useDispatch();

  useEffect(() => {
    setData(cards);
  }, [cards]);

  return (
    <>
      <div className={style.container}>
        <div className={style.inner}>
          <h2>Statistics</h2>
          <table>
            <caption>Cards</caption>
            <thead>
              <tr className={"title"}>
                {colomnTitle.map((title) => (
                  <td onClick={() => {
                    dispatch(sortTable())
                  }} key={title}>{title}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item: IDataCard, index: number) => (
                <StatisticsItem key={index} data={item} />
              ))}
            </tbody>
          </table>
          <button onClick={() => {
            localStorage.clear()
            dispatch(refreshStatistics())
            setData(cards)
          }}>RESET</button>
        </div>
      </div>
    </>
  );
}
