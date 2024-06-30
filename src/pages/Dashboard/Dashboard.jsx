import { Button, Layout } from "antd";

import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { Content, Header } from "antd/es/layout/layout";

const Dashboard = () => {
    return (
        <Layout 
        style={{ height: "100%" }}
         >
           <Sidebar />
           <Layout>
             <Header
               style={{
                 padding: 0,
                 color: "black",
                 height: "60px",
                 backgroundColor: "white",
               }}
             >
               <div
                 style={{
                   padding: 0,
                   display: "flex",
                   justifyContent: "end",
                   alignItems: "center",
                 }}
               >
                 <div
                   className="mr-4"
                 >
                   
                   <Button >Logout</Button>
                 </div>
               </div>
             </Header>
             <Content style={{ margin: "24px 16px 0" }}>
               <div
                 style={{
                   padding: 24,
                   minHeight: 360,
                 }}
               >
                 <Outlet />
               </div>
             </Content>
           </Layout>
         </Layout>
    );
};

export default Dashboard;