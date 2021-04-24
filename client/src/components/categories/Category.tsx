import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Layout, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import './Category.less';
import { StarOutlined } from "@ant-design/icons";
import { addWishlist } from '../../actions/WishlistAction';
import { useEffect, useState } from 'react';
import { getUserIdByMail } from '../../actions/getUserIdByMail/index';
import { supabase } from "../../SupaBase/conection";
const { Sider, Content } = Layout

const Category = (props:any): JSX.Element => {
console.log("PROPS",props)
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

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(addWishlist(categ.name, categ.images, categ.id, idUser?.userId[0]?.id))
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

        <img className="newImageCategory" src={categ.images[0]} />



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







    //   <div className='categoryContainer'>
    //       <Layout className='categoryLayout'>

    //           <Content className='categoryContent'>
    //               <Image src={categ.images[0]} width={600} />
    //           </Content>

    //           <Sider width={250} className='categorySider'>
    //               <div>
    //                   <h3 className='categoryH3'>
    //                     {categ.name}
    //                   </h3>
    //               </div>
    //               <div>
    //                   <p className='categoryP'>
    //                       {categ.description}
    //                   </p>
    //               </div>
    //               <div className="categoryButtons">    
    //                <Button onClick={handleClick} type="primary" ><StarOutlined /></Button>
    //                   <Link to={`/accomodations/${categ.id}`}>
    //                       <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center"}} className='categoryMoreInfoButton'>
    //                           More Info...
    //                       </Button>

    //                   </Link></div>


    //                   <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    //   <p>Do you want to add this category to your Wishlist?</p>

    // </Modal>

    //           </Sider>
    //       </Layout>


    //   </div>  

  )
}








export default Category;