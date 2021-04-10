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
            <div className="buttons">     
                <Button size="large" type="primary">Home</Button>
                <Button size="large" type="primary">Acomodation</Button>
                <Button size="large" style={{border:"0px"}} type="primary">Log In</Button>
                <Button size="large" style={{backgroundColor: "#9ED5E0"}}>Book Now</Button>
            </div>
           
            </Col>
            
        </Row>
      </Header>

    </>
  )
}