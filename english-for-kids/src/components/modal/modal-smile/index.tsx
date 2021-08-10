import Modal from "../index";
import { FailureSmile } from "../../../utils/icons";


interface IProps {
  errors?: number;
}

const ModalFailure = ({ errors }: IProps) => {
  return (
    <Modal
      image={FailureSmile()}
      text={`Error count ${errors}`}
      sound={`audio/failure.mp3`}
    />
  );
};

export default ModalFailure;
