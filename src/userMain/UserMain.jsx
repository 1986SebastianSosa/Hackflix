import MyRoutes from "./../MyRoutes";

import Header from "../components/partials/header/Header";
import BottomNav from "./../components/partials/botNav/BottomNav";

const UserMain = () => {
  return (
    <>
      <Header />
      <MyRoutes />
      <BottomNav />
    </>
  );
};

export default UserMain;
