import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { bookingsReducer } from '../../reducers/bookingsReducer';
import { supabase } from '../../SupaBase/conection';


export const MercadoPago = (props:any) => {
    const FORM_ID = 'payment-form';

    const [preferenceId, setPreferenceId] = useState<any>(null)

    const bookings = useSelector((state:any) => state?.bookings)
    const {category,booking,form}=bookings
    const createBooking={
      checkin:booking.range[0],
      checkout:booking.range[1],
      room_id:2
    }

    const precio=async()=>{
      const hola:any=supabase.from("categories").select('*').eq("id",`${category[1]}`).then((res:any)=>res.data[0].price)
      return hola
    }
    
    useEffect(() => {
        axios.post('http://localhost:4000/mercadopago/postPax',form).then(()=>axios.post('http://localhost:4000/mercadopago/postBooking',createBooking)).then(()=>precio().then(res=>axios.get(`http://localhost:4000/mercadopago?quantity=${booking.nights}&unit_price=${res}&title=${category[0]}&form=${form}&order=`))
        .then((res)=>{
          setPreferenceId(res.data.preferenceId)
        }).catch(e=>console.log("hola")))
        

    },[])


    useEffect(() => {
        if (preferenceId) {
          // con el preferenceId en mano, inyectamos el script de mercadoPago
          let script = document.createElement('script');
          script.type = 'text/javascript';
          console.log(preferenceId)
          script.src =
            'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
          script.setAttribute('data-preference-id', preferenceId);
          let form:any = document.getElementById(FORM_ID);
          form.appendChild(script);
          
        console.log(form)
        }
      }, [preferenceId]);


    //     const {data:room,error}:any= await supabase // Get a  una categoria random pa probar
    //     .from("categories")
    //     .select("*")
    //     .eq("id",5)

    //     const {price:unit_price,name:title,id:quantity}=room[0]  // destructuring del precio y el nombre de la cat (80, economic)

    //     mercadopago.preferences.create({            //aca se empezo a picar porque me tira un error en la SSL
    //         items:[                              // Hipoteticamente deberia estar bien pero bueno, me dio sueño
    //             {                                       
    //                 title,                      
    //                 unit_price,                   //Teoria: segun lei es un problema del dominio porque no
    //                 quantity                // posee la seguridad necesaria para este tipo de traspaso de datos
    //             }
    //         ]
    //     }).then((preference:any)=>{             //Exitos, nv
    //         return {preferenteId:preference.id}})
    //         .catch((e:any)=>console.log(e))


    return (
        <form id={FORM_ID} method="GET" />
    )

}
