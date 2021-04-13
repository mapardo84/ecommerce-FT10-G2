import React from "react";
import { Button, Form, Input, Select } from "antd";

const { Item } = Form;
const { Option } = Select;

export const AddRooms = () => {
    return (
        <>
            <Form>
                <Item>Add Rooms</Item>
                <Item>
                    <Input placeholder="Room Number"></Input>
                </Item>
                <Item>
                    <Input placeholder="Floor"></Input>
                </Item>

                <Select style={{ width: "200px" }} placeholder="Select an availability">
                    <Option value="available">Available</Option>
                    <Option value="in_cleaning">In cleaning</Option>
                    <Option value="out_of_Service">Out of service</Option>
                    <Option value="not_available">Not available</Option>
                </Select>
                <Select style={{ width: "200px" }} placeholder="Select a category">
                    <Option value="5">Economic</Option>
                    <Option value="2">Standard</Option>
                    <Option value="3">Suite</Option>
                    <Option value="6">Penthouse</Option>
                </Select>
                <Item>
                    <Input placeholder="Beds"></Input>
                </Item>
                <br/>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};
