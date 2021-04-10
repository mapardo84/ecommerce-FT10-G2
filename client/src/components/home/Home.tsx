
import { Card, Input } from 'antd'
import Text from 'antd/lib/typography/Text'
import './home.less'
import Categories from '../categories/Categories';

export const Home = () => {
    return (
        <div>
            {/* style={{ width: 300 }} */}
            <Card title="Listo con Ant" className="bgColor" >

                <Text type="success">Bienvenidos! a la gran C</Text>
            </Card>
            <Card title="Card Name" className="hightlight">
                <Input placeholder="Your Input" />
                <Input placeholder="Another Input" />
            </Card>

            <Categories />
        </div>
    )
}
