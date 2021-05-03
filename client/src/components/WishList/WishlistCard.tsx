import {useState} from 'react';
import {useDispatch} from 'react-redux'
import "../WishList/Wishlist.less"
import {deleteWishlist} from "../../actions/WishlistAction"
import { Button, Modal } from 'antd'

export default function WishlistCard(data:any) {
    const dispatch = useDispatch()

   

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick =(e:any) =>{  
       
        setIsModalVisible(true);
    }
  const handleOk = () => {
    dispatch(deleteWishlist(data.data.id))
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

    return (
       
        <div className="bodyWishlist">
            <div className="containerWishlist">

                <Button className="buttonWishlist" type="primary" onClick={handleClick} >X</Button>
                <Modal title="DeleteWishlist" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to delete this accomodation from your Wishlist?</p>
        
      </Modal>
                    <div className="card-wishlist">
                            <img className="imagesWishlist" src={data?.data?.categories?.images[0]} alt="IMG NOT FOUND"/>
                        <div className="card-head">{data?.data?.categories?.name}</div>
                    </div>
            </div>
        </div>
    )
}


