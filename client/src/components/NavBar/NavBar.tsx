import { Breadcrumb, Layout, Menu, Row, Divider, Col, Button, Modal } from 'antd';
import {LogIn} from '../LogIn/LogIn'
import { Content, Footer } from 'antd/lib/layout/layout';
import {useState} from 'react';
import './NavBar.less';
import hotel from "./hotel.png"
import {NavLink} from 'react-router-dom'
const { Header } = Layout;

export const NavBar = () => {

  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>

       <Header className="headd"> *


      <Menu className="headd">
        <Row className="header" justify="center">

          <div className="colContainer">
            <Col span={12}>
              <div className="navLeft">
                <img className="imagen" src={hotel} alt="IMG NOT FOUND" />
                <h1 className="navTitle">HENRY HOTEL</h1>
              </div>
            </Col>

            <Col span={12}>
              <div className="navRight">
                <NavLink to='/home'><Button className="navButton" size="large" type="text">Home</Button></NavLink>
                <NavLink to='/home/accomodations'><Button className="navButton" size="large" type="text">Acomodation</Button></NavLink>
                <Button onClick={()=>setVisible(true)} className="navButton" size="large" type="text">Log In</Button>
                <Button style={{ backgroundColor: "#5296A5", color:"white", border:"1px solid white"}}size="large">Book Now</Button>
              </div>
            </Col>

          </div>

        </Row>
      </Menu>
       </Header> 
      <Modal
      visible={visible}
      footer={[
        <a href="/signIn">Don't have an account? Sign In</a>
      ]}
      onCancel={()=>setVisible(false)}>

        <LogIn/>
      </Modal>
    </>
  )
}