import privateRoutes from "../Routes/privateRoutes";
import publicRoutes from "../Routes/publicRoutes"
const routes = [...privateRoutes,...publicRoutes];
export default routes;