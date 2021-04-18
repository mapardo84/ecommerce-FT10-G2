import { Layout, Menu, Button } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';



export const LayoutAdmin = () => {

const { Header, Content, Footer, Sider } = Layout;

const [collapsed, setCollapsed] = useState<boolean>(false)

const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
}

return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
            <Menu 
            theme="dark" 
            defaultSelectedKeys={['Rooms']} 
            mode="vertical-left">
                    <NavLink to="/admin/rooms">
                        <Button>Rooms</Button>
                    </NavLink>
                    <NavLink to="/admin/bookings">
                        <Button>Bookings</Button>
                    </NavLink>
                    <NavLink to="/admin/users">
                        <Button>Users</Button>
                    </NavLink>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}> Welcome to the admin panel
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </Layout>
    );
}