import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import './Category.less';
import { StarOutlined } from "@ant-design/icons";
import { addWishlist, getWishlist } from '../../actions/WishlistAction';
import { useEffect, useState } from 'react';
import { supabase } from "../../SupaBase/conection";
import { Dispatch } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


const Category = (props: any): JSX.Element => {
  const { categ, num } = props

  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    dispatch(addWishlist(categ.id, idUser?.userId[0]?.id))
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const wishlist = useSelector((state: any) => state.wishlist.userWishlist)

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsModalVisible(true);
  }

  const visibleButton = () => {
    return !wishlist.some((cat: any) =>
      cat.category_id === categ.id
    )
  }


  const session = supabase.auth.session();
  const idUser = useSelector((state: any) => state.idByMail)

  useEffect(() => {
    AOS.init();
    if (supabase.auth.user()) {
      dispatch(getWishlist())
    }
  }, [dispatch])

  return (
    <div data-aos="fade-left" data-aos-duration="1100" data-aos-once="true" className="category_cardContainer">
      <img className="category_cardImage" src={categ.images[0]} alt="IMG NOT FOUND" />

      <div className="category_cardWishlist">
        < Tooltip title="Add to WishList" >
          <Button className="buttonContainerCategory1" onClick={handleClick} type="text" style={{ visibility: session && visibleButton() ? 'visible' : 'hidden' }}  ><StarOutlined /></Button>
        </Tooltip >
        <Link to={`/accomodations/${categ.id}`}>
          <Button className="categoryCardButtonsAc category_cardButton2" size="large" type='primary'>
            More Info...
          </Button>
        </Link>
      </div>

      <div className="category_cardRight">
        <div className="category_cardName">
          {categ.name}
        </div>
        <div className="category_cardDescription">
          {categ.description}
        </div>
      </div>

      <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to add this category to your Wishlist?</p>
      </Modal>

    </div >
  )
}









export default Category;