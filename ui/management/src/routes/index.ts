import HomeRoute from "./Home";
import ExploreRoute from "./Explore";
import AboutRoute from "./About";
import UserManagueRoute from './UserManagement';

const createRoutes = (store: any) => {
  return [HomeRoute(store), ExploreRoute(store), AboutRoute(store), UserManagueRoute(store)];
};

export default createRoutes;
