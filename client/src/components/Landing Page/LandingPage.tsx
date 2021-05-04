import { Button } from "antd";
import './LandingPage.less'
import LogIn from "../LogIn/LogIn";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logo from "./images/logo.png"

export const LandingPage = () => {

    const history = useHistory();
    const params = new URLSearchParams(window.location.hash)
    params.get('type') === "recovery" && history.push("/password-reset/" + params.get('#access_token'));

    return (
        <div className="landingBackground">
            <div className='LandingPage'>

                <div className='landingleft'>

                    <img className='landingTitle' src={logo} alt="" />


                    <div className='landingText' >
                        A luxurious hotel, open the door to a whole new world. Feel the difference and prepare for a beautiful traveling experience.
                        </div><br />

                    <div className="landingButton"><NavLink to="/home"><Button className='lanButton' type="primary" size="large">Continue</Button></NavLink></div>
                </div>

                <div className='lanForm'>
                    <LogIn />
                </div>


            </div>
        </div>
    )
}

export default LandingPage






