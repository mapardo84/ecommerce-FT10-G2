import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Layout, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import './Category.less';
import { StarOutlined } from "@ant-design/icons";
import { addWishlist, getWishlist } from '../../actions/WishlistAction';
import { useEffect, useState } from 'react';
import { getUserIdByMail } from '../../actions/getUserIdByMail/index';
import { supabase } from "../../SupaBase/conection";
const { Sider, Content } = Layout



const Category = (props:any): JSX.Element => {
  var {categ, num} = props

  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const getIdByMail = async (valor: any, dispatch: any) => {
    const x = await getUserIdByMail(valor);
    dispatch(x)
  }
  
  let ids:any = []
const wishlist = useSelector((state:any )=> state.wishlist.userWishlist)

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(addWishlist(categ.id, idUser?.userId[0]?.id))
    ids.push(categ.id)
    setIsModalVisible(true);
  }

  const visibleButton = () =>{
    console.log(ids)
    ids.includes(wishlist.category_id)
  }

  
  const session = supabase.auth.session();
  const idUser = useSelector((state: any) => state.idByMail)

   useEffect(() => {
     if(idUser !== ""){
        dispatch(getWishlist(idUser?.userId[0]?.id))
     }
 }, [dispatch])

  


   useEffect(() => {
     getIdByMail(session?.user.email, dispatch)
   }, [dispatch])

  return (

    <div className="newGlobalCategory">

      <div className={num % 2 == 1 ? "newCategory_Container": "newCategory_Container2"}>

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
                  <Button className="buttonContainerCategory1" size="large" onClick={handleClick} type="primary" style={{ visibility: session? 'visible': 'hidden'}}  ><StarOutlined /></Button>
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