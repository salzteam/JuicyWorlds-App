import React from "react";
import { Navigate } from "react-router-dom";
class NonLogin extends React.Component {
  render() {
    const { children } = this.props;
    let check = null;
    const userInfo = JSON.parse(localStorage["userInfo"] || "{}");
    if (userInfo.token) check = userInfo;
    if (check)
      return <Navigate to="/" replace={true} state={{ isRedirected: true }} />;
    return children;
  }
}
export default NonLogin;
