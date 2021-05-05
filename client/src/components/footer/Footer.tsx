import { Layout, Button } from "antd";
import { NavLink } from "react-router-dom";
import "./footer.less";
import palm from './img/palm.png'
import palm2 from './img/palm2.png'
import instagram from './img/instagram.png'
import facebook from './img/facebook.png'
import { getUserProfile } from '../../actions/userProfile/userProfileActions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootReducer } from "../../reducers/rootReducer";

const { Footer } = Layout;

export const FooterLayout = () => {
  const dispatch = useDispatch()
  const userProfile = useSelector((state: RootReducer) => state.userProfile)
  const { data }: any = userProfile
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  return (
    <div className='containFooter'>
      <img className='palmBeach' src={palm} alt="mi hotelito" />
      <img className='palmBeach1' src={palm} alt="mi hotelito" />
      <img className='palmBeach2' src={palm} alt="mi hotelito" />
      <img className='palmBeach3' src={palm2} alt="mi hotelito" />
      <img className='palmBeach4' src={palm2} alt="mi hotelito" />
      <img className='palmBeach5' src={palm2} alt="mi hotelito" />

      <Footer className="laclande">

        <div className='containletterfooter'>
          {data?.role === "admin" ? <NavLink to='/admin'>
            <Button className="info" type="text">Admin panel</Button>
          </NavLink> : null}
          <NavLink to="/aboutUs">
            <Button className="info" type="text">About us</Button>
          </NavLink>

          <NavLink to="/faq"><Button className="info" type="text">F.A.Q</Button></NavLink>
        </div>
        <div className='containletterfooter'>


          <div className='logosfooter'>
            <div style={{ display: "flex" }}>
              <div className="logoNameFooter"> Instragram </div>
              <img className='logoFooterInsta' src={instagram} alt="redes" />
            </div>
            <div style={{ display: "flex" }}>
              <div className="logoNameFooter"> Facebook </div>
              <img className='logoFooterFace' src={facebook} alt="redes" />
            </div>
          </div>
        </div>

      </Footer>
    </div>
  );
};