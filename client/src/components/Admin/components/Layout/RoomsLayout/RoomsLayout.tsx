import { Layout, Menu, Button } from 'antd';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import { AddCategories } from '../../AddCategories/AddCategories';
import { AddRooms } from '../../AddRooms/AddRooms';
import { RoomsTable } from '../../RoomsTable/RoomsTable';



export const RoomsLayout = () => {
    const [addRoom, setAddRoom] = useState<boolean>(false)
    const [addCategories, setAddCategories] = useState<boolean>(false)
    
    const { Header, Content, Footer, Sider } = Layout;
    
    const [collapsed, setCollapsed] = useState<boolean>(false)
    
    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed)
    }
    
    return (
        <>
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
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Button onClick={()=>setAddRoom(true)}>Add Rooms</Button>
                    <Button onClick={()=>setAddCategories(true)}>Add Category</Button>
                </Header>
                <Content style={{ margin: '0 16px' }}> 
                    <RoomsTable/>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        <Modal
        visible={addRoom}
        onCancel={()=>setAddRoom(false)}
        footer={null}>

            <AddRooms/>

        </Modal>
        <Modal
        visible={addCategories}
        onCancel={()=>setAddCategories(false)}
        footer={null}>

            <AddCategories/>
        
            </Modal>
            </Layout>
    </>
    
    );
}