import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'antd'
import { BellOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { supabase } from "../../SupaBase/conection";
import {getWishlist} from "../../actions/WishlistAction"


toast.configure()
export default function Notifications() {
    const dispatch = useDispatch()
    const wishlist = useSelector((state:any )=> state.wishlist.userWishlist)
    const promotions = useSelector((state:any)=> state.promotions)

  useEffect(() => {
    if(supabase.auth.user()){
       dispatch(getWishlist())
    }
}, [dispatch])



  

    const notify=() =>{
    let noti= []
    for(let i=0; i<wishlist.length; i++){
           for(let j=0; j<promotions.length; j++){
            if(wishlist[i].category_id === promotions[j].categoryToApply){
              noti.push(wishlist[i]?.categories?.name);
             }
           }
        }
        if(!noti.length){
          toast.error("No promotions available")
        }else{
          for(let i =0; i< noti.length; i++){  
                 toast.info(`The category ${noti[i]} it's on promotions. Book it now!` )
            }
             
     
        }
}
    return (
        <div>
            <Button className="navButton" type="text" onClick={notify}><BellOutlined className="iconNotifi" /></Button>
        </div>
    )
}
