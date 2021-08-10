import { IDataCard } from "../../../types/entities";
import { getPercentage } from "../../../utils/functions";

interface IProps {
  data: IDataCard
}

const StatisticsItem = ({data}: IProps) => {
  return (
    <tr>
      <td>{data.word}</td>
      <td>{data.translation}</td>
      <td>{data.category}</td>
      <td>{data.correct + data.wrong}</td>
      <td>{data.correct}</td>
      <td>{data.wrong}</td>
      <td>{getPercentage(data.correct, data.correct + data.wrong)}</td>
    </tr>
  );
};

export default StatisticsItem;
