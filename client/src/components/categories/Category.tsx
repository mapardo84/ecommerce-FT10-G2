import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import './Category.less';
import { StarOutlined } from "@ant-design/icons";
import { addWishlist } from '../../actions/WishlistAction';
import { useEffect, useState } from 'react';
import { getUserIdByMail } from '../../actions/getUserIdByMail/index';
import { supabase } from "../../SupaBase/conection";
import {Dispatch} from 'react'


const Category = (props:any): JSX.Element => {
  const {categ,num} = props

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
              <Button className="buttonContainerCategory1" size="large" onClick={handleClick} type="primary" ><StarOutlined /></Button>
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