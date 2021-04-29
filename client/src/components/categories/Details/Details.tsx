import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initialStateProps } from "../../../reducers/categoriesReducer";
import { Carousel } from "antd";
import { Reviews } from "../../Reviews/Reviews";
//import "antd/dist/antd.css";
import "./Details.less";
import AddReview from "../../addReview/AddReview";
import {
  getUserIdByMail,
  checkoutValidation,
} from "./../../../actions/getUserIdByMail/index";
import { supabase } from "../../../SupaBase/conection";
import { getCategories } from "../../../actions/index";
import { Dispatch } from "redux";

let date: Date = new Date();
let fecha: string;
let day: number = date.getDate();
let month: number = date.getMonth() + 1;
let year: number = date.getFullYear();
if (month < 10) {
  fecha = year + "-0" + month + "-" + day;
} else {
  fecha = year + "-" + month + "-" + day;
}

const getIdByMail = async (
  value: string | undefined,
  dispatch: Dispatch<any>
) => {
  const resolve: any = await getUserIdByMail(value);
  dispatch(resolve);
};

const getCheckout = async (valor: string, dispatch: Dispatch) => {
  const x = await checkoutValidation(valor);
  dispatch(x);
};

const getCategoriesDB = async (
  value: number | undefined,
  dispatch: Dispatch<any>
) => {
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
  const idUser = useSelector((state: any) => state.idByMail);
  const checkout = useSelector((check: any) => check.getCheckOut);
  const reviews = useSelector((state: any) => state.reviews.reviews);
  const [veri, setVeri] = useState(false);

  useEffect(() => {
    setCategory(cat.find((x: category) => x.id === Number(id)));
    window.scroll(0, 0);
  }, [cat, id]);

  useEffect(() => {
    let verificacion = checkout.checkOut.filter((e: any) => e.pax_id != null);
    let reserva = verificacion.find(
      (item: any) => item.booking_id?.room_id?.category_id === Number(id)
    );
    if (
      reserva != null &&
      reserva.booking_id.checkout.split("-").join("") <
        fecha.split("-").join("") &&
      !reviews.some(
        (review: any) =>
          review.category_id === id &&
          review.user_id?.id === idUser.userId[0]?.id
      )
    ) {
      setVeri(true);
    }
  }, [id, checkout.checkOut, reviews]);
  //

  useEffect(() => {
    getIdByMail(session?.user.email, dispatch);
    //console.log(idUser.userId[0].id)
  }, [dispatch, session?.user.email]);

  useEffect(() => {
    getCheckout(idUser?.userId[0]?.uuid, dispatch);
  }, [idUser, dispatch]);

  useEffect(() => {
    if (cat.length < 1) {
      getCategoriesDB(id, dispatch);
    }
  }, [dispatch, cat.length, id]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
  };

  return (
    <div>
      <div>
        <Carousel {...settings} className="DetailsCarousel">
          {category?.images?.map((image: string, i: number) => {
            return (
              <img
                key={i}
                className="slidesDetailsImages"
                src={image}
                alt="Img not found"
              />
            );
          })}
        </Carousel>
      </div>
      <div className="categoryDetailsBackground">
        {/* 
        <h3>Rate: ${category?.price} usd</h3>
         */}
        <div className="categoryResponsiveDetails">
          {category?.name.toUpperCase()}
        </div>
        <div>
          <div className="categoryResponsiveDescription">
            {category?.description}
          </div>
        </div>
        <div
          className="categoryResponsiveDetails"
          style={{ fontSize: "30px", marginTop: "50px" }}
        >
          AMENITIES
        </div>

        <div className="categoryDetailFeaturesGlobal">
          <div className="categoryDetailFeatures">
            {category?.details?.map((detail: string, i: number) => {
              return (
                <p key={i} className="p-features">
                  <div style={{ display: "flex" }}>
                    <div className="numDetailCategory">{i}</div>
                    <div className="featuresText">{detail}</div>
                  </div>
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className="reviewsContainerGlobal">
        <div
          className="categoryResponsiveDetails"
          style={{ fontSize: "30px", marginTop: "0px" }}
        >
          REVIEWS
        </div>
        <div className="addReviewContainer">
          <AddReview categId={id} userId={idUser?.userId[0]?.id} veri={veri} />
        </div>
        <div className="reviewsContainer">
          <Reviews idRv={id} />
        </div>
      </div>
    </div>
  );
};

export default Details;
