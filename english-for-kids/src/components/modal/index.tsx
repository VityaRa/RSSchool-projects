import { useEffect } from "react"
import { playSound } from "../../utils/functions"
import style from "./style.module.scss"

interface IProps {
  image: JSX.Element,
  text: string,
  sound?: string,
}

const Modal = ({ image, text, sound }: IProps) => {
  useEffect(() => { if (sound) playSound(sound) }, [])
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.image}>{image}</div>
        <div className={style.text}>{text}</div>
      </div>
    </div>
  )
}

export default Modal
