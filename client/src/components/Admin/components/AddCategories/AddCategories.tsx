import { Input,Form, Select, Button, Upload } from 'antd'
import React, { useState } from 'react'
import { CategoryData } from '../../Helpers/addCategory'

const {Item}=Form
const {Option}=Select
const {TextArea}=Input
export const AddCategories=()=>{
    
    const [img,setImg] = useState<CategoryData>({
        name:"",
        capacity:0,
        description:"",
        details:[],
         price:0,
        images:[]
    })

    const onFinish =async(values:any)=>{
        const {name,capacity,description,details,price,images} = values
        await setImg({
            name,
            capacity,
            description,
            details,
            price,
            images:images.fileList.map((img:any)=>img.name)
        })
        console.log(values.photoLink)
    }

    return (
        <>
             <Form
             name="basic"
             initialValues={{ remember: true }}
             onFinish={onFinish}>
                <Item>Add Category</Item>
                <Item
                name="name"
                rules={[{ required: true, message: "Please, put a name for category!" }]}>
                    <Input placeholder="Category name"></Input>
                </Item>
                <Item
                name="capacity"
                rules={[{ required: true, message: "Please, put the capacity of the rooms in this category !" }]}>
                    <Input placeholder="Capacity"></Input>
                </Item>
                <Item
                name="description"
                rules={[{ required: true, message: "Please, put a description!" }]}>
                    <TextArea>Description</TextArea>
                </Item>
                <Item
                name="details"
                rules={[{ required: true, message: "Please, insert details!" }]}>
                    <Input placeholder="Details"></Input>
                </Item>
                <Item
                name="price"
                rules={[{ required: true, message: "Please, insert a price!" }]}>
                    <Input placeholder="Price"></Input>
                </Item>
                <Item
                name="images"> 
                    <Upload >
                        <Button>Upload Image
                        </Button>    Or
                    </Upload>
                </Item>
                <Item
                name="photoLink"
                rules={[{ required: true, message: "Insert link of one picture" }]}>
                    <Input placeholder="Photo Link"></Input>
                </Item>
                
                
                <br/>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}
