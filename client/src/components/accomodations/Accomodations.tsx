import { Layout, Select,Button } from 'antd';
import React, { ReactElement,useState } from 'react'
import Categories from '../categories/Categories'
import './accomodations.less';
import './../layout/homeLayout.less';

const { Option } = Select;
const { Content, Header } = Layout;



const Accomodations = ({ }: any): ReactElement => {

 

    return (
        <div>
            <div className='accomodationsDiv'>
                <div className='accomodationsH1 accomodationTitle'>Accomodation descriptions</div>
                <div className=''>
                   <br></br>
                    <h4 className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut hic necessitatibus blanditiis ad et, suscipit dignissimos recusandae, doloribus placeat reprehenderit cum iusto, molestiae quis vero assumenda autem fugiat aliquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit sapiente commodi inventore possimus dolore reprehenderit iusto soluta nemo eaque fuga obcaecati recusandae, consequuntur iste? Harum necessitatibus animi totam minima veritatis. lore</h4>
                 
                </div>
                
            </div>
            <Categories />
        </div>
    )
}


export default Accomodations;
