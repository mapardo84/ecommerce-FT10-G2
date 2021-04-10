import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Button,Layout,Image } from 'antd';
import './Category.css';
import {initialStateProps} from './../../reducers/categoriesReducer';
import { getCategories } from '../../actions';
import Category from './Category';

const Categories = ({ data }: any): JSX.Element=>{
    const dispatch = useDispatch();
    const cat = useSelector((state:initialStateProps)=>state.categories)

    useEffect(()=>{
        const prueba = async ()=>{
            const resolve = await getCategories()
            dispatch(resolve)
        }
        prueba()
    },[])



    return (
        <div>
            {
                cat.categories?.map((categ:any)=>(
                    <Category categ={categ}/>
                ))
            }
        </div>
    )
}

export default Categories;