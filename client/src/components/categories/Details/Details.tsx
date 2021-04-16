import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { initialStateProps } from "../../../reducers/categoriesReducer";
import { Button, Carousel, Image } from "antd";
//import "antd/dist/antd.css";
import "./Details.less";
import AddReview from "../../addReview/AddReview";
import {getUserIdByMail} from './../../../actions/getUserIdByMail/index';
import { supabase } from "../../../SupaBase/conection";
import AddReviewModal from '../../addReview/AddReviewModal';


const getIdByMail = async (value:any, dispatch: any) => {
  const resolve = await getUserIdByMail(value);
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

  useEffect(() => {
    setCategory(cat.find((x: any) => x.id === Number(id)));
  }, [cat, id]);

  useEffect(()=>{
    getIdByMail(session?.user.email,dispatch)
    //console.log(idUser.userId[0].id)
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
            <AddReview categId={id} userId={idUser?.userId[0]?.id}/>
        </div>
      </div>
    </div>
  );
};

export default Details;
