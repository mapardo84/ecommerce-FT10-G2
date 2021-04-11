import React from 'react';
import 'antd/dist/antd.css';
import '../accomodationsSelect/AccomodationsSelect.less'
import { Select } from 'antd';

const { Option } = Select


export const AccomodationsSelect = () => {


    return (
        <>
        <div className='acc'>
        
            <div className='input'>
            <h3 className='nameInput'>Select Category</h3>
            <Select className='select'>
                <Option value="category">Category</Option>
            </Select>
            </div>

            {/* Componente card */}
            
            </div>
        </>
    )
}