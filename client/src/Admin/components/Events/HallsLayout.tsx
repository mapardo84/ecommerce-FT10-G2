import { Layout } from "antd";
import { MenuLeft } from "../../MenuLeft";
import { HeaderAdmin } from "../../HeaderAdmin";
import { FooterAdmin } from "../../FooterAdmin";
import { NavLink } from "react-router-dom";
import { Halls } from './Halls';
import './Halls.less';

export const HallsLayout = () => {
    const { Content } = Layout;
    return (
        <Layout style={{ minHeight: "100vh" }}>
        <MenuLeft />
        <Layout>
            <HeaderAdmin />
            <Content style={{ margin: "0 16px" }}>
                <div className='demo'>
                    <div className="demo-nav">
                        <NavLink to="/admin/events/requests" className='link-events'>Requests</NavLink>
                        <NavLink to="/admin/events/bookings" className='link-events'>Bookings</NavLink>
                        <NavLink to="/admin/events/halls" className='link-events'>Halls</NavLink>
                    </div>
                </div>
            </Content>
            <Halls />
            <FooterAdmin />
        </Layout>
    </Layout>
    )
}