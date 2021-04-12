import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { RoomsTable } from "../../RoomsTable/RoomsTable";

export const RoomsLayout = () => {
  const [page, setPage] = useState("Rooms");

  const { Header, Content, Sider } = Layout;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["Rooms"]}
            mode="vertical-left"
          >
            <img
              src="./hotel.png"
              style={{ width: "50%", height: "50%", marginLeft: "22%" }}
            alt="Img not found"/>
            <Menu.Item key="Rooms" icon={<PieChartOutlined />}>
              {page !== "Rooms" ? <a href="/admin_rooms" /> : <></>}
              Rooms
            </Menu.Item>
            <Menu.Item key="Bookings" icon={<FileOutlined />}>
              {page !== "Bookings" ? <a href="/admin_bookings" /> : <></>}
              Bookings
            </Menu.Item>
            <Menu.Item key="Users" icon={<DesktopOutlined />}>
              {page !== "Users" ? <a href="/admin_users" /> : <></>}
              Users
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: "10px" }}
          />
          <Content style={{ margin: "0 16px" }}>
            <div className="table">
              <RoomsTable />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
