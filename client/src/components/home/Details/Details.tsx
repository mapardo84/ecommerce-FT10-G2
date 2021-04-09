import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Carousel, Image, Layout } from 'antd';
import "antd/dist/antd.css";
import './Details.css';

const { Header, Footer, Sider, Content } = Layout;
const Details = function () {
    
    const handleOnClick = (e:any) => {
        console.log('Bookearon!');
    }
    
    return (
        <div className='details-container'>
            <Layout className='details'>
                <Header id='details-header'>Room Category</Header>
                <Layout>
                    <Content>
                        <Carousel autoplay>
                            <Image className='pic-slider' src='https://dxfuztz1ia4nb.cloudfront.net/mahekalbeachresort.com-3258118679/cms/cache/v2/5f0f86bc6aac1.jpg/1920x1080/fit/80/566eba65d7c1ca616545739e2718a531.jpg' width={600}/>
                            <Image className='pic-slider' src='https://dxfuztz1ia4nb.cloudfront.net/mahekalbeachresort.com-3258118679/cms/cache/v2/5f0f86bb1f341.jpg/1920x1080/fit/80/519e4b9135c14a94a82d44bd990be1ab.jpg' width={600}/>
                            <Image className='pic-slider' src='https://dxfuztz1ia4nb.cloudfront.net/mahekalbeachresort.com-3258118679/cms/cache/v2/5ecd76fc6d643.jpg/1920x1080/fit/80/0ef17e269ec82e5a16ad2b84f07aef1a.jpg' width={600}/>
                        </Carousel>
                    </Content>
                    <Sider id='details-sider' width={600}>
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore repellendus vero, expedita vitae, nam doloremque ipsam repellat animi tempore dolorum facere, fugiat a porro voluptatum vel laudantium aspernatur error commodi.</p>
                        </div>
                        <div>
                            <h2>$Price USD</h2>
                            <h5>nightly rate</h5>
                        </div>
                        <div>
                            <Button className='book-button' type='primary' onClick={handleOnClick}>
                                Book
                            </Button>
                        </div>
                    </Sider>
                </Layout>
                <Footer id='details-footer'>Footer</Footer>
            </Layout>
        </div>
    )
}

export default Details;