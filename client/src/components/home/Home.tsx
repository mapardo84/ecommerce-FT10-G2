import Details from './Details/Details';
import { Card, Input } from 'antd'
import Text from 'antd/lib/typography/Text'
import './home.less'
import Categories from '../categories/Categories';

export const Home = () => {
    return (
        <div>
            {/* style={{ width: 300 }} */}
            <Categories />
        </div>
    )
}
