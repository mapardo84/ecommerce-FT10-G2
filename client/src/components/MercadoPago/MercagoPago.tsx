import { Button } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { update_balance } from '../../actions/Booking/pre_booking_action';
import { bookingsReducer } from '../../reducers/bookingsReducer';
import { supabase } from '../../SupaBase/conection';


export const MercadoPago = (props: any) => {
  const FORM_ID = 'payment-form';

  const [preferenceId, setPreferenceId] = useState<any>(null)
  const [bookingNow, setBookingNow] = useState(false)
  const bookings = useSelector((state: any) => state?.bookings)
  const {user_data} = useSelector((state: any) => state?.pre_booking)
  const [actual_ballance, setActual_ballance] = useState(0)
  const { booking } = bookings
  const {early_checkin,late_checkout}=booking
  const {positive_balance}=user_data[0]
  const dispatch = useDispatch()
  let actually_balance


  useEffect(() => {
    // axios.post('http://localhost:4000/mercadopago/postPax',form)
    //   .then(()=>axios.post('http://localhost:4000/mercadopago/postBooking',createBooking))
    let quantity=booking.nights
    let total_price=booking.fee
      if(early_checkin){                                  //Si hay EARLY CHECKIN, el precio va a ser el valor de la noche * la cantidad de noches, y a eso se le suma 1/2 noche
        total_price=total_price*quantity+booking?.original_price/2
        quantity=1
      }if(late_checkout){                                   //Si hay LATE CHECKOUT, lo mismo pero aca 
        total_price=(total_price*quantity)+booking?.original_price/2
        quantity=1
    }if(positive_balance){                                    //Si hay balance positivo...
      if((total_price*quantity)-positive_balance <= 0){  
        setActual_ballance(positive_balance-(total_price*quantity))                    //En el caso de que nos quede balance a favor, el precio se setea en 0, se hace la reserva automaticamente y se descuenta del saldo
        setBookingNow(true)  
        total_price=0
      }else{                                                      //En caso de que el saldo sea menor que el nuevo monto, se descuenta el saldo del total, se deja en 0 el saldo pendiente, y se genera una orden de pago con el monto restante      
        total_price=(total_price*quantity)-positive_balance
        quantity=1
      }
    }
    
    localStorage.setItem("total_price",total_price)
    
    console.log("asi salgo", total_price,"esta cantidad",quantity)
 
    axios.get(`http://localhost:4000/mercadopago?quantity=${quantity}&unit_price=${total_price}&title=HotelHenry`)
      .then((res) => {
        setPreferenceId(res?.data?.preferenceId)
        const prefer = res?.data?.preferenceId
        return prefer
      })
      .then((res) => {
        const data: any = supabase.auth.user()

        supabase
        .from("pre_booking")
        .update({
          preference_id: `${res}`,
        })
        .eq("user_email",`${data.email}`).then(res => res)
      })

      .catch(e => console.log("hola"))
  }, [])


  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      let form: any = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);


 
  const setBalance=(ballance:number)=>{
    dispatch(update_balance(supabase.auth.user()?.email,ballance))
  }

  return (
    <>
      {bookingNow?
        <Link to="/booking/success">
          <Button onClick={()=>setBalance(actual_ballance)}> Book Now </Button>
        </Link>
          :null}
      <form style={{ display: "flex", justifyContent: "center" }} id={FORM_ID} method="GET" />
    </>
  )

}
