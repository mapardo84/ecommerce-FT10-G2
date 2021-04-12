import { Layout, Menu, Row, Col, Button, Modal } from "antd";
import LogIn from "../LogIn/LogIn";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.less";
import hotel from "./hotel.png";
import { Register } from "../LogIn/Register";

const { Header } = Layout;

export const NavBar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  return (
    <>
      <Header className="headd">
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
                  <NavLink to="/home">
                    <Button className="navButton" size="large" type="text">
                      Home
                    </Button>
                  </NavLink>
                  <NavLink to="/home/accomodations">
                    <Button className="navButton" size="large" type="text">
                      Accomodations
                    </Button>
                  </NavLink>
                  <div className="loginButton">
                    <Button
                      onClick={() => setVisible(true)}
                      className="navButton"
                      size="large"
                      type="text"
                    >
                      Log In
                    </Button>
                  </div>
                  <NavLink to="/booking">
                    <Button
                      style={{
                        backgroundColor: "#5296A5",
                        color: "white",
                        border: "1px solid white",
                      }}
                      size="large"
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
          <div>
            Don't have an account?{" "}
            <Button onClick={() => setRegisterModal(true)}>Sign In</Button>
          </div>,
        ]}
        onCancel={() => setVisible(false)}
      >
        <LogIn />
      </Modal>

      <Modal
        visible={registerModal}
        footer={[]}
        onCancel={() => setRegisterModal(false)}
      >
        <Register />
      </Modal>
    </>
  );
};
