import { Layout,Menu } from 'antd';
import '../header/header.less'
import "antd/dist/antd.less";

const { Header } = Layout;

export const HeaderRender = () => {
    return (
        
 <Header className="okay">
     
      <Menu className="okay" theme="dark"mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
       
    )
}