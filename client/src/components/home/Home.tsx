
import { Card, Input } from 'antd'
import Text from 'antd/lib/typography/Text'
import './home.less'
import {ContentRender} from '../../components/content/content'
import {HeaderRender} from '../../components/header/header'
import Layout from 'antd/lib/layout/layout'

export const Home = () => {
    return (
        <div>
            
         
            <Layout><HeaderRender/>
               <ContentRender/>
            </Layout>
         
        </div>
    )
}
