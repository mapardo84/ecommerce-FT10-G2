import { Breadcrumb, Layout, Menu, Row, Divider, Col, Button } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import './NavBar.less';
import hotel from "./hotel.png"

const { Header } = Layout;

export const NavBar = () => {
  return (
    <>
      {/* <Header className="headd"> */}
      <Menu className="headd">
        <Row className="header" justify="center">

          <div className="colContainer">
            <Col span={12}>
              <div className="navLeft">
                <img className="imagen" src={hotel} alt="no funca bro" />
                <h1 className="navTitle">HENRY HOTEL</h1>
              </div>
            </Col>

            <Col span={12}>
              <div className="navRight">
                <Button className="navButton" size="large" type="text">Home</Button>
                <Button className="navButton" size="large" type="text">Acomodation</Button>
                <Button className="navButton" size="large" type="text">Log In</Button>
                <Button style={{ backgroundColor: "#178CA4", color:"white"}}>Book Now</Button>
              </div>
            </Col>

          </div>

        </Row>
      </Menu>
      {/* </Header> */}
    </>
  )
}