import { useSelector } from "react-redux";

import NavBar from "../components/UI/NavBar/NavBar";
import RoutesList from "./RoutesList";

function RoutesWrapper() {
  const { user_data } = useSelector((data) => data);

  return (
    <>
      {user_data.loged ? <NavBar /> : null}
      <RoutesList />
    </>
  );
}

export default RoutesWrapper;
