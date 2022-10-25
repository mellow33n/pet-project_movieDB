import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

export default function RoutesList() {
  let element = useRoutes(routes);

  return element;
}
