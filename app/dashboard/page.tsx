"use client"
import Heading2 from "../components/atoms/Heading2";
import Signout from "../components/auth/Signout";
import TabSelector from "../components/molecules/TabSelector";


const Dashboard = () => {

  return (
    <div className="pl-[10px] xl:pl-[450px] pr-[10px] xl:pr-[100px] mt-10">
      <Heading2 text="Home" />
      {/* <Signout /> */}
      <TabSelector />
    </div>
  );  

};

export default Dashboard;
