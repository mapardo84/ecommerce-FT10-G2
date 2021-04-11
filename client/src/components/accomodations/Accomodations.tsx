import { Layout, Select,Button } from 'antd';
import React, { ReactElement } from 'react'
import Categories from '../categories/Categories'
import './accomodations.less';

const { Option } = Select;
const { Content, Header } = Layout;



const Accomodations = ({ }: any): ReactElement => {


    return (
        <div>
            <div className='accomodationsDiv'>
                <h1 className='accomodationsH1'>Accomodation descriptions</h1>
                <div className='accomodationsP'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut hic necessitatibus blanditiis ad et, suscipit dignissimos recusandae, doloribus placeat reprehenderit cum iusto, molestiae quis vero assumenda autem fugiat aliquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit sapiente commodi inventore possimus dolore reprehenderit iusto soluta nemo eaque fuga obcaecati recusandae, consequuntur iste? Harum necessitatibus animi totam minima veritatis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo ullam, consequatur cum voluptates tempora culpa odio repellat suscipit iusto. Id cupiditate consequuntur aliquid est laudantium deserunt aut sed dolorum laboriosam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iure rem, nisi possimus inventore sint repudiandae consequuntur ea ex veritatis hic error magni? Saepe veniam itaque possimus ullam molestias impedit.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aut hic necessitatibus blanditiis ad et, suscipit dignissimos recusandae, doloribus placeat reprehenderit cum iusto, molestiae quis vero assumenda autem fugiat aliquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit sapiente commodi inventore possimus dolore reprehenderit iusto soluta nemo eaque fuga obcaecati recusandae, consequuntur iste? Harum necessitatibus animi totam minima veritatis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo ullam, consequatur cum voluptates tempora culpa odio repellat suscipit iusto. Id cupiditate consequuntur aliquid est laudantium deserunt aut sed dolorum laboriosam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iure rem, nisi possimus inventore sint repudiandae consequuntur ea ex veritatis hic error magni? Saepe veniam itaque possimus ullam molestias impedit.</p>
                </div>
                <div >
                    <span className='accomodationsFilterButton'>
                        <Select placeholder='Show...' style={{ width: 200 }}  >
                            <Option >Class: Economic</Option>
                            <Option >Class: Standard</Option>
                            <Option >Class: Suite</Option>
                            <Option >Class: Penthouse</Option>
                            <Option >Capacity: 1</Option>
                            <Option >Capacity: 2</Option>
                            <Option >Capacity: 4</Option>
                            <Option >Capacity: 6</Option>
                        </Select>
                    </span>
                    <span className='accomodationReserveButton'>
                        <Button size='large' type='primary' >Reserve</Button>
                    </span>
                </div>
            </div>
            <Categories />
        </div>
    )
}


export default Accomodations;
