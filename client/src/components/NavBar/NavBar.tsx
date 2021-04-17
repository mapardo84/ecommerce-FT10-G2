import { Layout, Menu, Row, Col, Button, Modal } from "antd";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.less";
import hotel from "./hotel.png"
import { Register } from "../LogIn/Register";
import { supabase } from '../../SupaBase/conection'
import { logOut } from "../../helpers/logOut";

const { Header } = Layout;


export const NavBar = () => {

  //Valida si el usuario esta logueado

  const authValidation = () => {
    const user: any = supabase.auth.user()
    if (user?.aud === "authenticated") {
      return true
    } else {
      return false
      
    }
  }

  const [visible, setVisible] = useState<boolean>(false);
  const [regOrLog, setRegOrLog] = useState<string>("logIn")
  return (
    <>
      <Header className="headd">
        <Menu className="headd">
          <Row className="header" justify="center">
            <div className="colContainer">
              <Col span={12}>
                <div className="navLeft">
                  <img className="imagen" src={hotel} alt="IMG NOT FOUND" />
                <NavLink className="navTitle" to="/home">HENRY HOTEL</NavLink>
                </div>
              </Col>

              <Col span={12}>
                <div className="navRight">
                  <NavLink to="/home">
                    <Button className="navButton" size="large" type="text">
                      Home
                    </Button>
                  </NavLink>
                  <NavLink to="/accomodations">
                    <Button className="navButton" size="large" type="text">
                      Accomodations
                    </Button>
                  </NavLink>
                  <div className="navLoginButton">
                    {
                      authValidation() ?
                        <NavLink to="/home">
                 
                          <Button
                            onClick={() => logOut()}
                            className="navButton"
                            type="text">
                             Log Out
                        </Button>
                   
                    
                        </NavLink>
                            
                        :
                        <NavLink to="/home">
                          <Button
                            onClick={() => setVisible(true)}
                            className="navButton"
                            type="text">
                            Log In
                         </Button>
                        </NavLink>

                    }
                  </div>
                  <NavLink to="/booking">
                    <Button
                      size="large"
                      className="btnNavbar"
                    >
                      Book Now
                    </Button>
                  </NavLink>
                </div>
              </Col>
            </div>
          </Row>
        </Menu>
      </Header>
      <Modal
        visible={visible}
        footer={[
          <div>{regOrLog === "logIn" ?
            <div>Don't have an account?
              <Button style={{marginLeft:"8px"}} onClick={() => setRegOrLog("signIn")}> Sign Up</Button>
            </div> :
            <div>
              If you have an account
              <Button style={{marginLeft:"8px"}} onClick={() => setRegOrLog("logIn")}>Log In</Button>
            </div>
          }
          </div>,
        ]}
        onCancel={() => {
          setRegOrLog("logIn")
          setVisible(false)
        }}
      >
        {regOrLog === "logIn" ? <LogIn /> : <Register />}
      </Modal>
    </>
  );
};