import { Button, Table, Form, Modal, Input, InputNumber, Tooltip, Popconfirm } from 'antd';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookedEvents } from '../../actions/adminEventsActions';

export interface IBookedEvents {
    id:number;
    name:string;
    startDate:string;
    finishDate:string;
    methodPayment: string;
    hall_id:number;
};

interface IFields {
    name: string[],
    value: string | number
};

const campos: IFields[] = [
    { name: ['name'], value: '' },
    { name: ['startDate'], value: '' },
    { name: ['finishDate'], value: '' },
    { name: ['methodPayment'], value: '' },
    { name: ['hall_id'], value: '' },
];

export const HallsBookings = () => {
    return (
        <h1>Halls Bookings</h1>
    )
}