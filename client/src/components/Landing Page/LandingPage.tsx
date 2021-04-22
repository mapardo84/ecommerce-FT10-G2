import {  Button, Typography } from "antd";
import './styles.less'
import LogIn from "../LogIn/LogIn";

const { Title, Text } = Typography;

export const LandingPage = () => {
    return (
        <div className='LandingPage'>


                    <div className='landingleft'>

                        <Title className='landingTitle'>HENRY HOTEL</Title>

                        <Text className='landingText' >
                            A luxurious hotel, open the door to a whole 
                            new world. Feel the difference and prepare for a 
                            beautiful traveling experience.
                        </Text><br />
                        
                    </div>

                    <div className='lanForm'>
                            <LogIn />
                    </div>

                    <div className='containbtn'>
                        <Button className='lanButton' type="primary" href="/home" size="large">Continue</Button>
                        </div>

           
        </div>
    )
}

export default LandingPage






