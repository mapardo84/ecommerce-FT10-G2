import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Image} from "antd"
import { getWishlist} from "../../actions/WishlistAction";
import {getUserIdByMail} from '../../actions/getUserIdByMail/index';
import { supabase } from "../../SupaBase/conection";
import {NavBar} from "../NavBar/NavBar";
import {FooterLayout} from "../footer/Footer";
import "../WishList/Wishlist.less"
export default function Wishlist() {
  const dispatch = useDispatch()

    const getIdByMail = async (valor:any, dispatch:any)=>{
        const x =await getUserIdByMail(valor);
        dispatch(x)
      }

    const session = supabase.auth.session();
    const idUser = useSelector((state:any) =>state?.idByMail)

  useEffect(()=>{
        getIdByMail(session?.user?.email,dispatch)
      },[dispatch])

  
    useEffect(() => {
      if(idUser !== ""){
         dispatch(getWishlist(idUser?.userId[0]?.id))
      }
  }, [dispatch,idUser])

  const wishlist = useSelector((state:any )=> state.wishlist.userWishlist)
  console.log(wishlist)

    return (
      
        <div >
        <NavBar />
        <div className="bodyWishlist">
                {wishlist?.map((x: any) => (
        <div className="containerWishlist">
          <div className="card-wishlist">
          <img className="imagesWishlist" src={x?.category_image[0]}  alt="IMG NOT FOUND"/>
            <div className="card__head">{x?.category_name}</div>
          </div>        
        </div>
))}
        </div>
      <FooterLayout />            
       
        </div>
    )
}

{/* <div class="container">
  <div class="card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Cat_plotting_something_evil%21.jpg">
    <div class="card__head">Plotting Cat</div>
  </div>
  <div class="card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/False_alarm_-a.jpg/1280px-False_alarm_-a.jpg">
    <div class="card__head">Angry Cat</div>
  </div>
  <div class="card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Neugierige-Katze.JPG/1280px-Neugierige-Katze.JPG">
    <div class="card__head">Curious Cat</div>
  </div>
  <div class="card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Al_acecho_%289272124788%29.jpg/1280px-Al_acecho_%289272124788%29.jpg">
    <div class="card__head">Prowling Cat</div>
  </div>
  <div class="card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mimi%26Tigsi.jpg/1280px-Mimi%26Tigsi.jpg">
    <div class="card__head">Sleepy Cat</div>
  </div>
</div> */}