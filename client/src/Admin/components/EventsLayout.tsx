import { Layout } from "antd";
import { MenuLeft } from "../MenuLeft";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterAdmin } from "../FooterAdmin";
import { Link } from "react-router-dom";
import '../components/Events/Halls.less';

export const EventsLayout = () => {
    const { Content } = Layout;
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />
            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>
                    <div className='demo'>
                        <div className="demo-nav">
                            <Link to="/admin/events/requests" className='link-events'>Requests</Link>
                            <Link to="/admin/events/bookings" className='link-events'>Bookings</Link>
                            <Link to="/admin/events/halls" className='link-events'>Halls</Link>
                        </div>
                    </div>
                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}