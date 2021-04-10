import { Layout } from 'antd';
import { NavBar } from '../NavBar/NavBar';
import {FooterLayout} from '../Footer/Footer'

const { Header, Footer, Content } = Layout;


export function LayoutTemplate() {


    return (
      <>
        <Layout>
         <NavBar/>   {/*NavBar*/}
          <Content></Content>       {/*Home, Accomodations, Detail, Booking*/}
        <FooterLayout/> 
        </Layout>
      </>
    )

}