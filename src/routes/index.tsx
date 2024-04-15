import { useRoutes } from "react-router-dom";
import { rootRouter } from "./routes"

const PageRoutes = () => {
  const routes = useRoutes(rootRouter);
  return routes
}

export default PageRoutes;