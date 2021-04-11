import {Layout, Menu, Row, Col, Button} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import LogIn from '../LogIn/LogIn';
import './NavBar.less'

const { Header } = Layout;

export const NavBar = () => {
  
  const [visible, setVisible] = useState<boolean>(false)

  const handleSelect=(key:React.Key):void=>{
    if(key==="LogIn"){
      setVisible(true)
    }else{
      setVisible(false)
    }
  }

  return (
    <>
      <Header className="headd">
        <Row className="header" justify="center">
          <Col xs={13}>
            <img className="imagen" src="./hotel.png" alt="no funca bro"/>
          </Col>
          <Col xs={10}>
            <Menu 
            className="headd" 
            theme="dark" 
            mode="horizontal" 
            onSelect={({key})=>handleSelect(key)}
            defaultSelectedKeys={['1']}>              
                <Menu.Item className="menu-opn" style={{marginTop:"20px"}} key="Home">Home</Menu.Item>
                <Menu.Item className="menu-opn" key="Acomodation">Acomodation</Menu.Item>
                <Menu.Item className="menu-opn" key="LogIn">Log In</Menu.Item>
                <Menu.Item className="menu-opn" key="Book">Book Now</Menu.Item>
            </Menu>
            </Col>
            
        </Row>
      </Header>
      <Modal
      visible={visible}
      footer={[
        <a href="/signIn">Don't have an account? Sign In</a>        
      ]}
      onCancel={()=>setVisible(false)}>
      
        <LogIn/>
      </Modal>

            <Col span={12}>
              <div className="navRight">
                <Button className="navButton" size="large" type="text">Home</Button>
                <Button className="navButton" size="large" type="text">Acomodation</Button>
                <Button className="navButton" size="large" type="text">Log In</Button>
                <Button style={{ backgroundColor: "#178CA4", color:"white"}}>Book Now</Button>
              </div>
            </Col>

        
    </>
  )
}