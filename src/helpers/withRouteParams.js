import React from "react";
import { useParams } from "react-router-dom";

function withRouteParams(Component) {
  function WithRouteParams(props) {
    const params = useParams();
    return <Component params={params} {...props} />;
  }
  return WithRouteParams;
}

export default withRouteParams;
