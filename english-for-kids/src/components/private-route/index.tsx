import { Route, Redirect } from "react-router-dom";
import { ComponentType } from "../../types/other";

interface IPrivateRouteProps {
  component: ComponentType;
  path: string;
  exact?: boolean;
  redirect: string;
  access: boolean | undefined;
}

const PrivateRoute = ({
  component: Component,
  access,
  redirect,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        access ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

export default PrivateRoute;
