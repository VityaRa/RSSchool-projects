import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { RootState } from "../redux/store";
import style from "./App.module.scss";
import GameCardList from "./card-list/game-card-list";
import MainCardList from "./card-list/main-card-list";
import SidebarButton from "./checkbox";
import Footer from "./footer";
import ModalSmile from "./modal/modal-sad";
import ModalFailure from "./modal/modal-smile";
import Sidebar from "./sidebar";
import Statistics from "./statistics";
import SwitchButton from "./switch-button";
import sidebar from "./sidebar/style.module.scss";
import { toggleSidebar } from "../redux/reducers/modalReducer";
import Actions from "./actions";
import PrivateRoute from "./private-route";
import Admin from "./admin";

const App = () => {
  const { errorCount } = useSelector((state: RootState) => state.game);
  const { isActiveSidebar } = useSelector((state: RootState) => state.modal);
  const isAuth = false;
  const cards = useSelector((state: RootState) => state.cards);

  const { isFailureModalActive, isSmileModalActive } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div
        className={style.container}
        style={{
          background: `url(${process.env.PUBLIC_URL}/background.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        onClick={(event) => {
          if (
            (!(event.target as HTMLElement).classList.contains(
              sidebar.sidebar
            ) &&
              isActiveSidebar) ||
            (event.target as HTMLElement).classList.contains(
              "sidebar__container"
            )
          ) {
            dispatch(toggleSidebar());
          }
        }}
      >
        {isSmileModalActive && <ModalSmile />}
        {isFailureModalActive && <ModalFailure errors={errorCount} />}

        <div className={style.app}>
          <Actions />

          <Switch>
            <Route exact path="/" component={MainCardList}></Route>
            <Route exact path="/cards/:id" component={GameCardList}></Route>
            <Route exact path="/stats" component={Statistics}></Route>

            {/* <Route exact path="/admin" component={Admin}></Route> */}

            <PrivateRoute
              access={isAuth}
              path="/admin"
              component={Admin}
              redirect="/"
            />
          </Switch>

          <Sidebar />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
