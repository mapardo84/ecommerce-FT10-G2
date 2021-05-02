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

  const getIdByMail = async (valor: any, dispatch: any) => {
    const x = await getUserIdByMail(valor);
    dispatch(x)
  }


  const session = supabase.auth.session();
  const idUser = useSelector((state: any) => state?.idByMail)

  useEffect(() => {
    getIdByMail(session?.user?.email, dispatch)
    window.scroll(0,0)
  }, [dispatch])


  useEffect(() => {
    if (idUser !== "") {
      dispatch(getWishlist(idUser?.userId[0]?.id))
    }
  }, [dispatch])




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



