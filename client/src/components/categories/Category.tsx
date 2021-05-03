import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import './Category.less';
import { StarOutlined } from "@ant-design/icons";
import { addWishlist, getWishlist } from '../../actions/WishlistAction';
import { useEffect, useState } from 'react';
import { supabase } from "../../SupaBase/conection";



const Category = (props:any): JSX.Element => {
  var {categ, num} = props

  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    dispatch(addWishlist(categ.id, idUser?.userId[0]?.id))
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
const wishlist = useSelector((state:any )=> state.wishlist.userWishlist)

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsModalVisible(true);
  }

  const visibleButton = () =>{
    return !wishlist.some((cat:any) =>
      cat.category_id === categ.id
    )
  }

  
  const session = supabase.auth.session();
  const idUser = useSelector((state: any) => state.idByMail)

  useEffect(() => {
    if(supabase.auth.user()){
       dispatch(getWishlist())
    }
}, [dispatch])

  return (

    <div className="newGlobalCategory">

      <div className={num % 2 === 1 ? "newCategory_Container": "newCategory_Container2"}>

        <img className="newImageCategory" src={categ.images[0]} alt="IMG NOT FOUND" />

        <div className="newDescription">

          <div className="containerCategory1">
            <div className="newDescriptionCategory">
              {categ.name}
            </div>

            <div className="newDescriptionText">
              {categ.description}
            </div>
          </div>

          <div className="containerCategory2">
            <Tooltip title="Add to WishList">
                  <Button className="buttonContainerCategory1" size="large" onClick={handleClick} type="primary" style={{ visibility: session && visibleButton()? 'visible': 'hidden'}}  ><StarOutlined /></Button>
            </Tooltip>

            <Link to={`/accomodations/${categ.id}`}>
              <Button className="buttonContainerCategory2" size="large" type='text'>
                More Info...
            </Button>
            </Link>
          </div>


          <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Do you want to add this category to your Wishlist?</p>
          </Modal>

        </div>

      </div>
    </div >
  )
}








export default Category;