import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import "../WishList/Wishlist.less"
import { deleteWishlist } from "../../actions/WishlistAction"
import { Button, Modal } from 'antd'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function WishlistCard(data: any) {
  const dispatch = useDispatch()

  useEffect(() => {
    AOS.init();
    window.scroll(0, 0)
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
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
    <div >
      <div data-aos="fade-left" data-aos-duration="1000" data-aos-once="true" className="wishlistCardContainer" >
        <img className="wishlistCardImage" src={data?.data?.categories?.images[0]} alt="IMG NOT FOUND" />
        <div className="cardwishName">{(data?.data?.categories?.name)?.toUpperCase()}</div>
        <div className="cardwishborder"></div>
        <Button className="cardwishButton1" onClick={handleClick} >X</Button>

        <Modal title="DeleteWishlist" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Do you want to delete this accomodation from your Wishlist?</p>

        </Modal>
      </div>
    </div>
  )
}


