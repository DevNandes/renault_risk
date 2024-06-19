import React from "react";
import { getToken } from "~/services/storage";
import Public from "./Public";
import Private from "./Private";

function Routes() {
  const renderRoutes = () => {
    const token = getToken()
    return !token ? <Public /> : <Private />;
  }

  return <>{renderRoutes()}</>;
}

export default Routes;
