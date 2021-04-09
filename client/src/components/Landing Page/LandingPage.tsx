import React from 'react'
import { Row, Col, Button, Typography, Divider } from "antd";
import './styles.less'

const { Title, Text } = Typography;

export const LandingPage = () => {
    return (
        <div className='LandingPage'>
            <Row align="middle" justify="space-around">

                <Col span={14}>

                    <div className='landingleft'>

                        <Title className='landingTitle'>HENRY HOTEL</Title>

                        <Text className='landingText' >
                            A luxurious hotel, open the door to a whole new world. Feel the diference and prepare for a beatiful traveling experience.
                        </Text><br />

                        <Button className='lanButton' type="primary" href="/home" size="large">Continue as guest</Button>
                    </div>
                </Col>

                <Col span={10}>
                    <div className='lanForm'>
                        <Divider>
                            FORM
                        </Divider>
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default LandingPage






