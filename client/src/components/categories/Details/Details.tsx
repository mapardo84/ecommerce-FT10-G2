import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { initialStateProps } from "../../../reducers/categoriesReducer";
import { Button, Carousel, Image } from "antd";
import {Reviews} from '../../Reviews/Reviews'
//import "antd/dist/antd.css";
import "./Details.less";

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
  const [category, setCategory] = useState<category>();
  const cat: category[] = useSelector(
    (state: initialStateProps) => state.categories
  ).categories;

  useEffect(() => {
    setCategory(cat.find((x: any) => x.id === Number(id)));
  }, [cat, id]);

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
      </div>
      <div>
          <Reviews idRv = {id}/>
      </div>
    </div>
  );
};

export default Details;
