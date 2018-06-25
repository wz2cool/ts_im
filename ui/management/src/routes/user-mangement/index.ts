import UserManagementLoader from "./user-management.loader";

export default (store: any) => ({
  path: "/userManagement",
  component: UserManagementLoader(store),
});
