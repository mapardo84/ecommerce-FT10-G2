import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined
} from '@ant-design/icons';
import { useState } from 'react';



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
                <Menu.Item key="Rooms" icon={<PieChartOutlined />}>
                        Rooms
                </Menu.Item>
                <Menu.Item key="Bookings" icon={<FileOutlined />} >
                        Bookings
                </Menu.Item>
                <Menu.Item key="Users" icon={<DesktopOutlined />} >
                        Users
                </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item></Breadcrumb.Item>
                        <Breadcrumb.Item></Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                      
            </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </Layout>
    );
}