import { Layout,Button } from "antd";
import { NavLink } from "react-router-dom";
import "./footer.less";
import palm from './img/palm.png'
import palm2 from './img/palm2.png'

const { Footer } = Layout;

export const FooterLayout = () => {
  return (
    <div className='containFooter'>
    
       <img className='palmBeach' src={palm}/>
         <img className='palmBeach1' src={palm}/>
        <img className='palmBeach2' src={palm}/>
        <img className='palmBeach3' src={palm2}/>
        <img className='palmBeach4' src={palm2}/>
        <img className='palmBeach5' src={palm2}/>
 
      <Footer className="laclande" style={{ textAlign: "center" }}>
       
         <div className='containletterfooter'>
              <Button className="info" type="text">Contact us</Button>
            <NavLink to='/admin'>
              <Button className="info" type="text">Admin panel</Button>
              </NavLink>
           
              <Button className="info" type="text">About us</Button>
         
        
          <NavLink to="/faq"><Button className="info" type="text">F.A.Q</Button></NavLink>
           
              <Button className="info" type="text">Adress</Button>
            
              <Button className="info" type="text">REDES LOGOS</Button>
              </div>
      </Footer>
      </div>
  );
};