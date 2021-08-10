import { RSSchool } from "../../utils/icons";
import style from "./style.module.scss";

const Footer = () => {
  return (
    <footer className={style.container}>
      <div className={style.inner}>
        <h2>English For Kids</h2>
        <p>
          The application was developed as part of the course:
          "JavaScript/Front-end" from RS School
        </p>
        <div>
          <RSSchool />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
