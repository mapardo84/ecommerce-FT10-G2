import { Layout, Menu, Row, Col, Button, Modal, Dropdown, message, Divider } from "antd";
import { DownOutlined, UserOutlined, ImportOutlined, UnorderedListOutlined, CalendarOutlined } from '@ant-design/icons';
import LogIn from "../LogIn/LogIn";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.less";
import hotel from "./hotel.png"
import { Register } from "../LogIn/Register";
import { supabase } from '../../SupaBase/conection'
import { logOut } from "../../helpers/logOut";
import { useHistory } from "react-router-dom";


const { Header } = Layout;


export const NavBar = () => {

  var [name, setName] = useState("empty")
  const history = useHistory();

  //log out
  const logOutSession = () => {
    logOut()
     history.push("/");
  }
  


  //Valida si el usuario esta logueado
  const authValidation = async () => {
    const user: any = supabase.auth.user()
    if (user?.aud === "authenticated") {

      const email = user.email

      var { data, error } = await supabase
        .from('users')
        .select('first_name')
        .eq('email', email)

      setName(data && data[0]?.first_name)
      console.log(name)

    } else {
      return false
    }
  }

  authValidation()


  const menu = (
    <Menu className="dropMenuNav">
      <Menu.Item key="1" icon={<UserOutlined />}>
        Account
      </Menu.Item>
      <Menu.Item key="2" icon={<CalendarOutlined />}>
        Reservations
      </Menu.Item>
      <Divider className="dividerNav"></Divider>
      <Menu.Item key="3" onClick={() => logOutSession() } icon={<ImportOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );

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
                      name !== "empty" ?

                        <Dropdown.Button
                          type="primary"
                          className="DropNavButton"
                          overlay={menu}
                          placement="bottomCenter"
                          icon={<DownOutlined style={{ fontSize: "14px", marginTop: "6px" }} />}>
                          <UserOutlined />
                          {name}
                        </Dropdown.Button>
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