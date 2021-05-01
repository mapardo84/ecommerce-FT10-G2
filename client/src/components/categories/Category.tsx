import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import './Category.less';
import { StarOutlined } from "@ant-design/icons";
import { addWishlist } from '../../actions/WishlistAction';
import { useEffect, useState } from 'react';
import { getUserIdByMail } from '../../actions/getUserIdByMail/index';
import { supabase } from "../../SupaBase/conection";
import { Dispatch } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


const Category = (props: any): JSX.Element => {
  const { categ, num } = props

  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const getIdByMail = async (valor: any, dispatch: Dispatch<any>) => {
    const x = await getUserIdByMail(valor);
    dispatch(x)
  }

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(addWishlist(categ.id, idUser?.userId[0]?.id))
    setIsModalVisible(true);
  }
  const session = supabase.auth.session();
  const idUser = useSelector((state: any) => state.idByMail)



  useEffect(() => {
    getIdByMail(session?.user.email, dispatch)
    AOS.init();
  }, [dispatch])


  return (
    <div data-aos="fade-left" data-aos-duration="700"  data-aos-once="true"  className="category_cardContainer">
      <img className="category_cardImage" src={categ.images[0]} alt="IMG NOT FOUND" />

      <div className="category_cardWishlist">
        < Tooltip title="Add to WishList" >
          <Button style={{height:"45px"}} size="large" onClick={handleClick} type="primary" ><StarOutlined style={{fontSize:"24px"}} /></Button>
        </Tooltip >
        <Link to={`/accomodations/${categ.id}`}>
          <Button style={{height:"45px"}} className="category_cardButton2" size="large" type='primary'>
            More Info...
          </Button>
        </Link>
      </div>

      <div>
        <div className="category_cardName">
          {categ.name}
        </div>
        <div className="category_cardDescription">
          {categ.description}
        </div>
      </div>

    </div >
  )
}

// imagen   <img className="newImageCategory" src={categ.images[0]} alt="IMG NOT FOUND" />
//name  {categ.name}
//description    {categ.description}

//     < Tooltip title = "Add to WishList" >
//       <Button className="buttonContainerCategory1" size="large" onClick={handleClick} type="primary" ><StarOutlined /></Button>
// </Tooltip >

//   <Link to={`/accomodations/${categ.id}`}>
//     <Button className="buttonContainerCategory2" size="large" type='text'>
//       More Info...
// </Button>
//   </Link>

{/* <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
<p>Do you want to add this category to your Wishlist?</p>
</Modal> */}








export default Category;