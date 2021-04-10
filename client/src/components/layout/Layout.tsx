import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;


export function LayoutTemplate() {


    return (
      <>
        <Layout>
          <Header></Header>    {/*NavBar*/}
          <Content></Content>       {/*Home, Accomodations, Detail, Booking*/}
          <Footer></Footer>
        </Layout>
      </>
    )

}