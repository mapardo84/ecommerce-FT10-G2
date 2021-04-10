import { Layout, Menu, Row, Col, Button } from "antd";
import "./Footer.less";

const { Footer } = Layout;

export const FooterLayout = () => {
  return (
    <Footer className="footer">
        <Row className="ftr" justify="center" align="bottom">
          <Col span={21}>
            <Menu className="leftMen" theme="dark" mode="vertical">
               <Menu.Item>Contact us</Menu.Item>      
                <Menu.Item>Admin panel</Menu.Item>
                <Menu.Item>About us</Menu.Item>
              
              
            </Menu>
          </Col>
          <Col span={3}>
            <Menu className="rightMen" theme="dark" mode="vertical">
                <Menu.Item>adress</Menu.Item>
                <Menu.Item>REDES LOGOS</Menu.Item>
              
            </Menu>
          </Col>
        </Row>
        </Footer>
  );
};
