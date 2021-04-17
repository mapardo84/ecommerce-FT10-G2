import { Row, Col, Button, Typography } from "antd";
import './styles.less'
import LogIn from "../LogIn/LogIn";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


const { Title, Text } = Typography;

export const LandingPage = () => {

    const history = useHistory();

    const location = useLocation();
    
    if (JSON.stringify(location.hash).indexOf("type=recovery") !== -1) {
        var acces_token = location.hash.substring(14).split("&")[0]
        history.push("/password-reset/"+acces_token);
    }

    return (
        <div className='LandingPage'>
            <Row align="middle" justify="space-around">

                <Col span={14}>

                    <div className='landingleft'>

                        <Title className='landingTitle'>HENRY HOTEL</Title>

                        <Text className='landingText' >
                            A luxurious hotel, open the door to a whole new world. Feel the difference and prepare for a beautiful traveling experience.
                        </Text><br />

                        <Button className='lanButton' type="primary" href="/home" size="large">Continue as guest</Button>
                    </div>
                </Col>

                <Col span={10}>
                    <div className='lanForm'>
                        <LogIn />
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default LandingPage






