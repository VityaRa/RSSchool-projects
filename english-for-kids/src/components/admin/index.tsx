import { Route, Switch } from "react-router";
import GameButton from "../button";
import SidebarButton from "../checkbox";
import Statistics from "../statistics";

const Admin = () => {
  return (
    <div>
      <Switch>
        <Route path="/admin" component={() => (<span>Main</span>)}></Route>
        <Route path="/admin/1" component={Statistics}></Route>
        <Route path="/admin/2" component={SidebarButton}></Route>
      </Switch>
    </div>
  );
};

export default Admin;
