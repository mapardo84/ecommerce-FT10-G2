import { Button, Table, Form, Modal, Input, InputNumber, Tooltip, Popconfirm } from 'antd';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHalls } from '../../actions/adminEventsActions';


export interface IHalls {
    id:number;
    name:string;
    description:string;
    image:string;
};

interface IFields {
    name: string[],
    value: string | number
};

const campos: IFields[] = [
    { name: ['name'], value: '' },
    { name: ['description'], value: '' },
    { name: ['image'], value: '' },
];
  
export const Halls = () => {

    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const [ editId, setEditId ] = useState<null | IHalls>(null)
    const [ fields, setFields ] = useState<IFields[]>(campos);
    const { halls } = useSelector((state: any) => state?.adminEvents.halls);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllHalls()) 
    
    }, [halls, dispatch])

  

    return (
 
        <div>
            {console.log(halls)}
            <h1>hola</h1>
        </div>
    );
};