import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ICard } from '../../../types/entities';
import { IMainState } from '../../../types/redux-types';
import { ToBack } from '../../../utils/icons';
import style from '../../card/style.module.scss'

interface IProps {
  card: ICard,
  isFlipped: boolean,
}

const BackSide = ({card, isFlipped} : IProps) => {
  const { isPlayMode } = useSelector((state: RootState) => state.game);

  return (
    <div className={classNames(style.back_side, isPlayMode ? style.active : '')}>
      <div className={style.image_wrapper}>
        <img src={`${process.env.PUBLIC_URL}/${card.image}`} alt="card_image" />
      </div>
      <div className={style.title_wrapper}>
        <span className={style.word}>{card.translation}</span>
        <div className={style.icon}>
          <ToBack />
        </div>
      </div>
    </div>
  );
};

export default BackSide;