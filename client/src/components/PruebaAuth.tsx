import {Button, Form, Input} from 'antd'
import React from 'react'
import {supabase} from '../SupaBase/conection'
const mercadopago = require ('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-1669112607394412-041121-ba7e34ade2494fbcf53f1666380be011-741939764'
  });



export const PruebaAuth=()=>{


const onClick=async()=>{
    const {data:room,error}:any= await supabase // Get a  una categoria random pa probar
    .from("categories")
    .select("*")
    .eq("id",5)

    const {price:unit_price,name:title}=room[0]  // destructuring del precio y el nombre de la cat (80, economic)
    
    mercadopago.preferences.create({            //aca se empezo a picar porque me tira un error en la SSL
        items:[                              // Hipoteticamente deberia estar bien pero bueno, me dio sueño
            {                                       
                title,                      
                unit_price,                    //Teoria: segun lei es un problema del dominio porque no
                quantity:5                // posee la seguridad necesaria para este tipo de traspaso de datos
            }
        ]
    }).then((preference:any)=>{             //Exitos, nv
        return {preferenteId:preference.id}})
        .catch((e:any)=>console.log(e))
        
    
    
}
    return (
        <>
            <Button onClick={onClick}>
                LACLANDEPA
            </Button>
        </>
    )
}
