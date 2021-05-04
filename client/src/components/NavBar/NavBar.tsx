import { Layout, Menu, Row, Col, Button, Modal, Divider, Dropdown, Drawer } from "antd";
import { DownOutlined, UserOutlined, ImportOutlined, HeartOutlined, CalendarOutlined, PicLeftOutlined, MenuOutlined } from '@ant-design/icons';
import LogIn from "../LogIn/LogIn";
import { useEffect, useState } from "react";
import "./NavBar.less";
import { Register } from "../LogIn/Register";
import { supabase } from '../../SupaBase/conection'
import { logOut } from "../../helpers/logOut";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../actions/loginActions";
import { NavLink, useHistory } from "react-router-dom";
import hotel from "./logoHotel.png"
import Notifications from "../Notifications/Notifications"
import { SiHotelsDotCom } from "react-icons/si";
import { MdHotel } from "react-icons/md";
import { AiFillHome, AiFillStar, AiFillCalendar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxFill, RiLoginBoxFill } from "react-icons/ri";
import { IconContext } from "react-icons/lib";

import { pre_booking_empty } from "../../actions/Booking/pre_booking_action";
import { getWishlist } from "../../actions/WishlistAction";

// const { Header } = Layout;

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
    localStorage.removeItem("Check&Guests")
    localStorage.removeItem("Accomodation")
    dispatch(pre_booking_empty())
  }

  const menu = (
    <Menu className="dropMenuNav">
      <Menu.Item key="1" onClick={() => history.push("/myProfile")} icon={<PicLeftOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={() => history.push("/wishlist")} icon={<HeartOutlined />}>
        Wish List
      </Menu.Item>
      <Menu.Item key="3" onClick={() => history.push("/myBookings")} icon={<CalendarOutlined />}>
        Bookings
      </Menu.Item>
      <Divider className="dividerNav"></Divider>
      <Menu.Item key="4" onClick={() => logOutSession()} icon={<ImportOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [regOrLog, setRegOrLog] = useState<string>("logIn")


  const [navBar, setNavBar] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 20) {
      setNavBar(true)
    } else {
      setNavBar(false);
    }
  }
  window.addEventListener('scroll', changeBackground)


  //Resposive Nav
  const [resNavVisivle, setResNavVisivle] = useState<boolean>(false)
  const handleNavResponsive = () => {
    setResNavVisivle(true)
  }

  const handleNavResponsiveClose = () => {
    setResNavVisivle(false)
  }

  //--------


  useEffect(() => {
    if (number === 1) {
      setVisible(false)
      dispatch(setModalState(0))
    }
  }, [])

  useEffect(() => {
    if (supabase.auth.user()) {
      dispatch(getWishlist())
    }
  }, [])

  const wishlist = useSelector((state: any) => state.wishlist.userWishlist)
  return (
    <>
      <IconContext.Provider value={{ color: "grey", size: '24px', style: { verticalAlign: 'middle', marginRight: "20px" } }}>
        <div className={navBar ? 'NavBarLayoutActive' : "NavBarLayout"}>
          {/* Normal navBar content */}
          <div className="navBarMenu">
            <div className="colContainer">
              <Col span={12}>
                <div className="navLeft">
                  <NavLink to="/home"><img className={navBar ? 'imagenNavBarActive' : "imagenNavBar"} src={hotel} alt="IMG NOT FOUND" /></NavLink>
                </div>
              </Col>
              <Col span={12}>
                <div className="navRight">
                  <NavLink to="/home">
                    <Button className={navBar ? 'navButtonActive' : "navButton"} size="large" type="text">
                      Home
                    </Button>
                  </NavLink>
                  <NavLink to="/accomodations">
                    <Button className={navBar ? 'navButtonActive' : "navButton"} size="large" type="text">
                      Accomodations
                    </Button>
                  </NavLink>
                  <NavLink to="/events">
                    <Button className={navBar ? 'navButtonActive' : "navButton"} size="large" type="text">
                      Events
                    </Button>
                  </NavLink>
                  <div className="navLoginButton">
                    {
                      authValidation() ?
                        <Dropdown
                          className="DropNavButton"
                          overlay={menu}
                          // trigger={['click']}
                          placement="bottomCenter">
                          <Button className={navBar ? 'navButtonActive' : "navButton"} type="text">
                            <UserOutlined />Account <DownOutlined />
                          </Button>
                        </Dropdown>

                        :
                        <Button
                          onClick={() => setVisible(true)}
                          className={navBar ? 'navButtonActive' : "navButton"}
                          type="text">
                          Log In
                        </Button>
                    }
                  </div>

                  <div>
                    <Notifications navState={navBar} />
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
          </div>


          {/* Responsive Navbar Content */}
          <div className="navResponsiveMenu" >

            <div className="navImageContainer">
              <NavLink to="/home"><img className={navBar ? 'imagenNavBarActive' : "imagenNavBar"} src={hotel} alt="IMG NOT FOUND" /></NavLink>
            </div>

            <div className={"navButtonMenu"}>
              <Button type="text" onClick={handleNavResponsive} >
                <MenuOutlined style={navBar ? { fontSize: "24px", color: "black" } : { fontSize: "24px", color: "white" }} />
              </Button>
            </div>
          </div>

        </div>


        <Drawer
          placement="right"
          closable={true}
          onClose={handleNavResponsiveClose}
          visible={resNavVisivle}
          key="top"
          width="270px"
          height="100px"

          zIndex={1200}
          drawerStyle={{ backgroundColor: "rgb(247, 247, 247)" }}
        >
          <div className="navDrawerContent">
            <Divider style={{ color: "grey" }} orientation="left">MAIN</Divider>

            <NavLink to="/booking">
              <Button onClick={handleNavResponsiveClose} size="large" className="navButton" type="text">
                <SiHotelsDotCom /> Book Now
            </Button>
            </NavLink>
            <NavLink to="/accomodations">
              <Button onClick={handleNavResponsiveClose} className="navButton" size="large" type="text">
                <MdHotel />Accomodations
            </Button>
            </NavLink>
            <NavLink to="/home">
              <Button onClick={handleNavResponsiveClose} className="navButton" size="large" type="text">
                <AiFillHome /> Home
            </Button>
            </NavLink>

            {
              authValidation() ?

                <div className="authenticationResponsive">
                  <Divider style={{ color: "grey" }} orientation="left">USER</Divider>
                  <NavLink to="/myProfile">
                    <Button onClick={handleNavResponsiveClose} className="navButton" size="large" type="text">
                      <FaUserCircle /> My Profile
                  </Button>
                  </NavLink>
                  <NavLink to="/wishlist">
                    <Button onClick={handleNavResponsiveClose} className="navButton" size="large" type="text">
                      <AiFillStar /> WishList
                  </Button>
                  </NavLink>
                  <NavLink to="/myBookings">
                    <Button onClick={handleNavResponsiveClose} className="navButton" size="large" type="text">
                      <AiFillCalendar />  Bookings
                  </Button>
                  </NavLink>
                  <Button style={{ marginTop: "5px" }} onClick={() => logOutSession()} className="navButton" size="large" type="text">
                    <RiLogoutBoxFill /> Log Out
                 </Button>


                </div>
                :
                <div>
                  <Divider style={{ color: "grey" }} orientation="left">USER</Divider>

                  <Button
                    onClick={() => {
                      setVisible(true)
                      setResNavVisivle(false)
                    }}
                    className="navButton"
                    type="text">
                    <RiLoginBoxFill />Log In
                </Button>

                </div>


            }

          </div>

        </Drawer>
        {/* ----------------------- */}
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

      </IconContext.Provider>
    </>
  );
};