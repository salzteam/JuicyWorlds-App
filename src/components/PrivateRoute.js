import React from "react";
import { Navigate } from "react-router-dom";
class PrivateRoute extends React.Component {
  render() {
    const { allowedRoles = [], children } = this.props;
    const userInfo = JSON.parse(localStorage["userInfo"] || "{}");
    if (!userInfo.token)
      return (
        <Navigate to="/login" replace={true} state={{ isRedirected: true }} />
      );
    if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role))
      return (
        <Navigate to="/login" replace={true} state={{ isRedirected: true }} />
      );
    return children;
  }
}
export default PrivateRoute;
