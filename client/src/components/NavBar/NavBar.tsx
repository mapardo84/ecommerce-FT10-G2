import { Layout, Menu, Row, Col, Button, Modal, Divider, Dropdown } from "antd";
import { DownOutlined, UserOutlined, ImportOutlined, HeartOutlined, CalendarOutlined } from '@ant-design/icons';
import LogIn from "../LogIn/LogIn";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.less";
import hotel from "./hotel.png"
import { Register } from "../LogIn/Register";
import { supabase } from '../../SupaBase/conection'
import { logOut } from "../../helpers/logOut";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../actions/loginActions";

const { Header } = Layout;

export const NavBar = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  //Valida si el usuario esta logueado
  const authValidation = () => {
    const user: any = supabase.auth.user()
    if (user?.aud === "authenticated") {
      return true
    }
  }

  const number = useSelector((state: any) => state.login.number);

  const logOutSession = () => {
    var status = logOut()
    status && history.push("/");
  }

  const menu = (
    <Menu className="dropMenuNav">
      <NavLink to="/wishlist">
          <Menu.Item key="1" icon={<HeartOutlined />}>
        Wish List
      </Menu.Item>
      </NavLink>
    
      <Menu.Item key="1" icon={<CalendarOutlined />}>
        Reservations
      </Menu.Item>
      <Divider className="dividerNav"></Divider>
      <Menu.Item key="2" onClick={() => logOutSession()} icon={<ImportOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [regOrLog, setRegOrLog] = useState<string>("logIn")

  useEffect(() => {
    if (number === 1) {
      setVisible(false)
      dispatch(setModalState(0))
    }
  },[number, dispatch])

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
                        <Dropdown
                          className="DropNavButton"
                          overlay={menu}
                          trigger={['click']}
                          placement="bottomCenter">
                          <Button className="btn-nav" type="primary">
                            <UserOutlined />Account <DownOutlined />
                          </Button>
                        </Dropdown>

                        :
                        <Button
                          onClick={() => setVisible(true)}
                          className="navButton"
                          type="text">
                          Log In
                         </Button>
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
        width={450}
        destroyOnClose={true}
        footer={[
          <div>{regOrLog === "logIn" ?
            <div>Don't have an account?
              <Button style={{ marginLeft: "8px" }} onClick={() => setRegOrLog("signIn")}> Sign Up</Button>
            </div> :
            <div>
              If you have an account
              <Button style={{ marginLeft: "8px" }} onClick={() => setRegOrLog("logIn")}>Log In</Button>
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