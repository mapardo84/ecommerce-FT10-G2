import { Breadcrumb, Layout, Menu, Row, Divider, Col, Button } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import './NavBar.less'

const { Header } = Layout;


export const NavBar = () => {
  return (
    <>

      <Header className="headd">
        <Row className="header" justify="center">
          <Col xs={13}>
            <img className="imagen" src="./hotel.png" alt="no funca bro"/>
          </Col>
          <Col xs={10}>
            <Menu className="headd" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>              
                <Menu.Item className="menu-opn" style={{marginTop:"20px"}} key="1">Home</Menu.Item>
                <Menu.Item className="menu-opn" key="2">Acomodation</Menu.Item>
                <Menu.Item className="menu-opn" key="3">Log In</Menu.Item>
                <Menu.Item className="menu-opn" key="4">Book Now</Menu.Item>
            </Menu>
            </Col>
            
        </Row>
      </Header>

    </>
  )
}