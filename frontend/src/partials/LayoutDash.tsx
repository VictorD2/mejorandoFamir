import React from "react";
import { Route } from "react-router-dom";
import Aside from "./Aside";
import NavbarDash from "./NavbarDash";
interface PrivateRouteProps {
  component: any;
  exact: boolean;
  path: string;
}
const DashboardLayout: React.FC = ({ children, ...rest }) => {
  return (
    <>
      <NavbarDash />
      <Aside />
      {children}
    </>
  );
};
const LayoutDash = (props: PrivateRouteProps) => {
  const { component: Component, exact, path, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <DashboardLayout>
          <Component {...matchProps} />
        </DashboardLayout>
      )}
    />
  );
};

export default LayoutDash;
