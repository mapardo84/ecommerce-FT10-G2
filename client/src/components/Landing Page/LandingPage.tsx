import {  Button, Typography } from "antd";
import './styles.less'
import LogIn from "../LogIn/LogIn";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const { Title, Text } = Typography;

export const LandingPage = () => {

    const history = useHistory();
    const params = new URLSearchParams(window.location.hash)
    params.get('type') === "recovery" && history.push("/password-reset/" + params.get('#access_token'));

    return (
        <div className='LandingPage'>

                    <div className='landingleft'>

                        <Title className='landingTitle'>HENRY HOTEL</Title>

                        <Text className='landingText' >
                            A luxurious hotel, open the door to a whole new world. Feel the difference and prepare for a beautiful traveling experience.
                        </Text><br />

                        <NavLink to="/home"><Button className='lanButton' type="primary" size="large">Continue</Button></NavLink>
                    </div>
                

                
                    <div className='lanForm'>
                        <LogIn />
                    </div>
               
           
        </div>
    )
}

export default LandingPage






