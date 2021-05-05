import { Layout } from "antd";
import { MenuLeft } from "../../MenuLeft";
import { HeaderAdmin } from "../../HeaderAdmin";
import { FooterAdmin } from "../../FooterAdmin";
import { NavLink } from "react-router-dom";
import { HallsRequests } from './HallsRequests';
import './Halls.less';

export const HallsRequestsLayout = () => {
    const { Content } = Layout;
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />
            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px", maxHeight: "70px" }}>
                    <div className='demo'>
                        <div className="demo-nav">
                            <NavLink to="/admin/events/requests" className='link-events'>Requests</NavLink>
                            <NavLink to="/admin/events/bookings" className='link-events'>Bookings</NavLink>
                            <NavLink to="/admin/events/halls" className='link-events'>Halls</NavLink>
                        </div>
                    </div>
                </Content>
                <HallsRequests />
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}