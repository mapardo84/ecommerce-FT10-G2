import { useState } from 'react';

import { classicLogIn } from '../../helpers/logIn';
import LogIn from './LogIn';

interface logIn{
    email:string
    password:string
}

export const Rodrigo = () => {
  const [visible, setVisible] = useState<boolean>(false);

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