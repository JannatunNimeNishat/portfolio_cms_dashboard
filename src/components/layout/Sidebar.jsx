/* eslint-disable no-unused-vars */

import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
const { Sider } = Layout;
import '../../style/Sidebar.css'

const Sidebar = () => {
  const sidebarItems = [
    {
      key: "hero",
      label: <NavLink className={({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link'
      } to={`/dashboard/hero`}>Hero</NavLink>,
    },
  ];

  return (
    <Sider
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <div
        className=""
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Portfolio CMS</h1>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
       
      />
    </Sider>
  );
};

export default Sidebar;
