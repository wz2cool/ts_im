import UserManagement from "./UserManagement";

export default (store: any) => ({
    path: "/userManagement",
    component: UserManagement(store),
});
