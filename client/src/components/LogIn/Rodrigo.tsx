import React, { useState } from 'react';
import { Modal, Button,Form,Input } from 'antd';
import { classicLogIn } from '../../helpers/logIn';
import LogIn from './LogIn';

interface logIn{
    email:string
    password:string
}

export const Rodrigo = () => {
  const [visible, setVisible] = useState(false);

  const onFinish=(values:logIn)=>{

    classicLogIn(values.email,values.password)
    setTimeout(setVisible)    
    
}

  return (
    <>
      <LogIn/>
    </>
  );
};