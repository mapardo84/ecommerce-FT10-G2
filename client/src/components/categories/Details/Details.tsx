import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { initialStateProps } from "../../../reducers/categoriesReducer";
import { Button, Carousel, Image } from "antd";
import {Reviews} from '../../Reviews/Reviews'
//import "antd/dist/antd.css";
import "./Details.less";
import AddReview from "../../addReview/AddReview";
import {getUserIdByMail, checkoutValidation} from './../../../actions/getUserIdByMail/index';
import { supabase } from "../../../SupaBase/conection";
import { getCategories } from '../../../actions/index'


let date:any = new Date()
let fecha:any 
let day:any = date.getDate()
let month:any = date.getMonth() + 1
let year:any = date.getFullYear()
if(month < 10){
  fecha= year+'-0'+month+'-'+day
}else{
  fecha= year+'-'+month+'-'+day
}



const getIdByMail = async (value:any, dispatch: any) => {
  const resolve = await getUserIdByMail(value);
  dispatch(resolve);
};

const getCheckout = async (valor:any, dispatch:any)=>{
  const x =await checkoutValidation(valor);
  dispatch(x)
}

const getCategoriesDB = async (value: number | undefined, dispatch:any) => {
  const resolve = await getCategories(value);
  dispatch(resolve);
};


interface category {
  id: number;
  name: string;
  capacity: number;
  description: string;
  price: number;
  images: string[];
  details: string[];
}

const Details = ({ data }: any): JSX.Element => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState<category>();
  const cat: category[] = useSelector(
    (state: initialStateProps) => state.categories
  ).categories;
  const session = supabase.auth.session();
  const idUser = useSelector((state:any) =>state.idByMail)
  const checkout= useSelector((check:any) => check.getCheckOut)

  let verificacion = checkout.checkOut.filter( (e:any) => e.pax_id !== null)
  if(verificacion[0]?.booking_id?.room_id?.category_id == id){
    let verificacionId= verificacion
    if(verificacionId[0].booking_id.checkout.split('-').join('') < fecha.split('-').join('')){
      verificacion= true
    }
  }
  else{
    verificacion=false
  }

  useEffect(() => {
    setCategory(cat.find((x: any) => x.id === Number(id)));
  }, [cat, id]);

  useEffect(()=>{
    getIdByMail(session?.user.email,dispatch)
    //console.log(idUser.userId[0].id)
    
  },[dispatch])

  useEffect(()=>{
    getCheckout(idUser?.userId[0]?.uuid,dispatch)
  },[idUser])

  useEffect(()=>{
    if(cat.length < 1){
      getCategoriesDB(id,dispatch)
    }
  },[dispatch])
  

  const handleOnClick = (e: any) => {
    console.log("Bookearon!");
  };
  return (
    <div className="details_Container">
      <div className="header-slider">
        <header className="pic-slider">
          <Carousel autoplay>
            {category?.images?.map((image: string, i: number) => {
              return (
                <div key={i} className="image-details">
                  <Image src={image} height={400} width={600} />
                </div>
              );
            })}
          </Carousel>
        </header>
      </div>
      <div className="details-conteiner">
        <div className="title-category">
          <h1
            style={{
              fontSize: "32px",
              textAlign: "center",
              color: "black",
              paddingTop: "10px",
            }}
          >
            {category?.name}
          </h1>
        </div>

        <div className="content-description">
          <p id="description">{category?.description}</p>
        </div>
        <div className="details_main">
          <div className="details_left">
            <div className="content-features">
              <section id="features-section">
                {category?.details?.map((detail: string, i: number) => {
                  return (
                    <p key={i} className="p-features">
                      - {detail}
                    </p>
                  );
                })}
              </section>
            </div>
          </div>
          <div className="aside-book">
            <h3>Rate: ${category?.price} usd</h3>
            <div>
              <Button type="primary" onClick={handleOnClick} size="large">
                Book
              </Button>
            </div>
          </div>
        </div>
        <div>
            <AddReview categId={id} userId={idUser?.userId[0]?.id} veri={verificacion}/>
            <Reviews idRv = {id}/>
        </div>
      </div>
    </div>
  );
};

export default Details;
