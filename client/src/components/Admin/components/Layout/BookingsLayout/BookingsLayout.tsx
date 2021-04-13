import { Layout, Menu, Button } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { RoomsTable } from '../../RoomsTable/RoomsTable';
import Modal from 'antd/lib/modal/Modal';
import { AddRooms } from '../../AddRooms/AddRooms';
import { Link } from 'react-router-dom';



export const BookingsLayout = () => {
    const [addRoom, setAddRoom] = useState<boolean>(false)

    const [page, setPage] = useState("Bookings")

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
                <img src='./hotel.png' style={{width:"50%",height:"50%",marginLeft:"22%"}}/>
                <Menu.Item key="Rooms" icon={<PieChartOutlined />}>
                    {page!=='Rooms'?<Link to='/admin/rooms'></Link>:<></>}
                        Rooms
                </Menu.Item>
                <Menu.Item key="Bookings" icon={<FileOutlined />} >
                        Bookings
                {page!=='Bookings'?<Link to="='/admin/bookings'"></Link>:<></>}
                </Menu.Item>
                <Menu.Item key="Users" icon={<DesktopOutlined />} >
                {page!=='Users'?<Link to='/admin/users'></Link>:<></>}
                        Users
                </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding:'10px'}}>
                    <Button onClick={()=>setAddRoom(true)}> AGREGAR HABITACION </Button>
                </Header>
                    
                <Content style={{ margin: '0 16px' }}>
                    <div className="table">
                        <RoomsTable/>
                    </div>
                </Content>
            </Layout>
        </Layout>
        <Modal
        visible={addRoom}
        onCancel={()=>setAddRoom(false)}
        footer={null}>

            <AddRooms/>

        </Modal>
        </>
    );
}