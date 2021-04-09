import React from 'react';
import Details from './Details/Details';
import { Card } from 'antd';
import Text from 'antd/lib/typography/Text';
import './Home.css';

export const Home = () => {
    return (
        <div className='home-container'>
            <Card title="Listo con Ant" style={{ width: 300 }}>
                <Text type="success">Bienvenidos! a la gran C</Text>
            </Card>
            <hr></hr>
            <Details/>
        </div>
    )
}
