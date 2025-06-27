import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import HomeSubheader from "./HomeSubheader/HomeSubheader";
import HomeHeader from "./HomeHeader/HomeHeader";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <HomeHeader
        title="Welcome"
        tag={user?.userName}
        description="This is a welcoming screen for the entry of the application , you can now see the options"
      />

      <HomeSubheader />
    </div>
  );
}
