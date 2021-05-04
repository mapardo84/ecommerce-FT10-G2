import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getWishlist } from "../../actions/WishlistAction";
import { getUserIdByMail } from '../../actions/getUserIdByMail/index';
import { supabase } from "../../SupaBase/conection";
import WishlistCard from "./WishlistCard";
import "../WishList/Wishlist.less"

export default function Wishlist() {
  const dispatch = useDispatch()
  const wishlist = useSelector((state: any) => state.wishlist.userWishlist)

  useEffect(() => {
    if (supabase.auth.user()) {
      dispatch(getWishlist())
    }
  }, [])


  return (

    <div className="containerMap">

      <div className="">
        <img className="wishImage" src={"/images/wish.jpg"} alt="Img not found" />
        <div className="wishTitle">
          WISH LIST
        </div>
      </div>

      {wishlist.length !== 0 ?
        wishlist?.map((x: any) => (
          <WishlistCard data={x} />
        )
        ) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "84.2vh", fontSize: "35px", color: "gray" }}>You don't have accomodations on your Wishlist</div>}
    </div>
  )
}



