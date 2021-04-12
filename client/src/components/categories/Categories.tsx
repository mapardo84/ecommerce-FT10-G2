import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Button,Layout,Image,Select } from 'antd';
import './Category.less';
import {initialStateProps} from './../../reducers/categoriesReducer';
import { getCategories } from '../../actions';
import Category from './Category';
import './../accomodations/accomodations.less';
import './../layout/homeLayout.less';


const { Option } = Select;
const { Content, Header } = Layout;
const Categories = ({ data }: any): JSX.Element=>{
    const dispatch = useDispatch();
    const cat = useSelector((state:initialStateProps)=>state.categories)

    useEffect(()=>{
        const prueba = async ()=>{
            const resolve = await getCategories(filtro)
            dispatch(resolve)
        }
        prueba()
    },[])
    const [filtro,setFiltro] = useState(Number);
    const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
    const handleChange =(value:any)=>{
        setFiltro(value.target.value);
        console.log(value.target.value);
    }
    

    /* if(filtro =='Economic 1 Person'){
        console.log('entre')
        let categoriasfiltrad:any = [];
        setCategoriasFiltradas(cat.categories?.filter((e:any)=>e.includes(filtro))) 
        console.log(categoriasFiltradas)
    } *//* else if(filtro =='Standard 2 Persons'){
        categoriasFiltro = cat.categories?.filter((e:any)=>{
            if(e.capacity == 2 && e.name == 'Standard'){
                return e
            }
        })
    }else if(filtro =='Standard 4 Persons'){
        categoriasFiltro = cat.categories?.filter((e:any)=>{
            if(e.capacity == 4 && e.name == 'Standard'){
                return e
            }
        })
    }else if(filtro =='Suite 2 Persons'){
        categoriasFiltro = cat.categories?.filter((e:any)=>{
            if(e.capacity == 2 && e.name == 'Suite'){
                return e
            }
        })
    }else if(filtro =='Suite 4 Persons'){
        categoriasFiltro = cat.categories?.filter((e:any)=>{
            if(e.capacity == 4 && e.name == 'Suite'){
                return e
            }
        })
    }else if(filtro =='Penthouse 6 Persons'){
        categoriasFiltro = cat.categories?.filter((e:any)=>{
            if(e.capacity == 6 && e.name == 'Penthouse'){
                return e
            }
        })
    } */
    

    return (
        <div>
           <div>
            <div >
                    <span className='accomodationsFilterButton'>
                        <select placeholder='Show...' style={{ width: 200 }} onChange={handleChange} >
                            <option >No Filter</option>
                            <option value={5}>Economic 1 Person</option>
                            <option value={1}>Standard 2 Persons</option>
                            <option value={2}>Standard 4 Persons</option>
                            <option value={4}>Suite 2 Persons</option>
                            <option value={3}>Suite 4 Persons</option>
                            <option value={6}>Penthouse 6 Persons</option>

                        </select>
                    </span>
                    <span className='accomodationReserveButtonSpan'>
                        <Button size='large' type='primary' className='accomodationReserveButton' >Reserve</Button>
                    </span>
                </div>
        </div>
        <div className='categoriesContainer'>
            {
                cat.categories?.map((categ:any)=>(
                    <Category categ={categ}/>
                ))
            }
        </div> 
        </div>
        
    )
}

export default Categories;