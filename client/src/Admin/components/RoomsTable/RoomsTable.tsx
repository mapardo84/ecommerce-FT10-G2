import { Button, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllRooms} from '../../../actions/roomsActions'


export interface Room{
    id:number,
    name:string,
    description:any,
    floor:number,
    availability:string,
    beds:number,
    category_id:number
    categories:{name:string}[]
}
const columns:any = [
    {
      title: 'Room Number',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      key:'floor',
      filters: [
        { text: '1st floor', value: 1 },
        { text: '2nd floor', value: 2 },
        { text: '3rd floor', value: 3 },
        { text: '4th floor', value: 4 },
        { text: '5th floor', value: 5 },
      ],
      filterMultiple:false,
      onFilter: (value:number, rooms:Room) => {
        return rooms.floor=== value}
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      filters: [
        { text: 'Availble', value: "available" },
        { text: 'Not available', value: "not available" },
        { text: 'In cleaning', value: "in cleaning" },
        { text: 'Out of service', value: "out of service" },
      ],
      filterMultiple:false,
      onFilter: (value:string, rooms:Room) => {
        return rooms.availability === value}
    },
    {
        title: 'Category',
        dataIndex: 'categories',
        render:(categories:{name:string})=>(<>{categories.name}</>),
        key: 'category',
        filters: [
          { text: 'Economic', value:5},
          { text: 'Standard', value:2},
          { text: 'Suite', value:3},
          { text: 'Penthouse', value:6},
        ],
        filterMultiple:false,
        onFilter: (value:number, rooms:Room) => {
          return rooms.category_id === value}
      }, 
      {
        title: 'beds',
        dataIndex: 'beds',
        key: 'beds',
        filters: [
          { text: 'One bed', value: 1 },
          { text: 'Two beds', value: 2 },
          { text: 'Three beds', value: 3 },
        ],
        filterMultiple:false,
        onFilter: (value:number, rooms:Room) => {
          return rooms.beds=== value}
      }
    ]

    function onChange(filters:any,) {
    }
  



export const RoomsTable=()=>{
  
    const handleChange=(filters:any)=>{
      
    }
    const {roomsList} = useSelector((state:any) => state?.rooms)
    console.log(roomsList)
    const dispatch = useDispatch()

    useEffect(() => {
    getAllRooms().then(res=>dispatch(res))    
}, [])

    

    return (
        <>

        <Table 
        dataSource={roomsList}
        columns={columns}
        pagination={{position:['bottomCenter']}}
        onChange={onChange} />;

        </>
    )
}
