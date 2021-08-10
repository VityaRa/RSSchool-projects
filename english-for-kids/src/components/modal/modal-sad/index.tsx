import style from "./style.module.scss"
import Modal from "../index"
import { SuccessSmile } from "../../../utils/icons"

const ModalSmile = () => {
    return (
        <Modal
            image={SuccessSmile()}
            text={"Congratz!"}
            sound={`audio/success.mp3`}
        />
    )
}

export default ModalSmile
