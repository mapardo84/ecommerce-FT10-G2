import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Button, Badge } from 'antd'
import { BellOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../../SupaBase/conection";
import { getWishlist, saveChecked } from "../../actions/WishlistAction"
import "./Notification.less"

toast.configure()
export default function Notifications() {
  const dispatch = useDispatch()
  const wishlist = useSelector((state: any) => state.wishlist.userWishlist)
  const promotions = useSelector((state: any) => state.promotions)

  const noChecked = useSelector((state: any) => state.wishlist.noChecked)

  const [bellState, setbellState] = useState<boolean>(false)

  useEffect(() => {
    activeBell()
    if (supabase.auth.user()) {
      dispatch(getWishlist())
      console.log("entré 1-----------------------------------------")
    }
  }, [wishlist, promotions, noChecked ])


  const activeBell = () => {
    for (let i = 0; i < wishlist.length; i++) {
      for (let j = 0; j < promotions.length; j++) {
        if (wishlist[i].category_id === promotions[j].categoryToApply) {
          setbellState(true)
          return
        }
      }
    }
    setbellState(false)
  }




  const notify = () => {
    dispatch(saveChecked(false))
    let noti = []
    for (let i = 0; i < wishlist.length; i++) {
      for (let j = 0; j < promotions.length; j++) {
        if (wishlist[i].category_id === promotions[j].categoryToApply) {
          noti.push(wishlist[i]?.categories?.name);
        }
      }
    }

    if (!noti.length) {
      toast.error("No promotions available")
    } else {
      for (let i = 0; i < noti.length; i++) {
        toast.info(`The category ${noti[i]} it's on promotions. Book it now!`)
      }
    }
  }

  // console.log("bell", bellState, "CHECKD", noChecked)
  return (
    <div className="bellNavBarI">
      {bellState && noChecked ?
        <Badge count={1}>
          <Button className="navButton" type="text" onClick={notify}>
            <BellOutlined className="iconNotifi" />
          </Button>
        </Badge>
        :
        <Button className="navButton" type="text" onClick={notify}>
          <BellOutlined className="iconNotifi" />
        </Button>
      }
    </div>
  )
}
