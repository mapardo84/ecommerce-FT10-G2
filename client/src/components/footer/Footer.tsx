import { Layout, Row, Col, Button } from "antd";
import "./footer.less";

const { Footer } = Layout;

export const FooterLayout = () => {
  return (
      <Footer className="laclande" style={{ textAlign: "center" }}>
        <Row justify="center" align="bottom">
          <Col span={21}>
            <Row>
              <Button type="text">Contact us</Button>
            </Row>
            <Row>
              <Button type="text">Admin panel</Button>
            </Row>
            <Row>
              <Button type="text">About us</Button>
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Button type="text">adress</Button>
            </Row>
            <Row>
              <Button type="text">REDES LOGOS</Button>
            </Row>
          </Col>
        </Row>
      </Footer>
  );
};
