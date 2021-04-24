import { ReactElement } from "react";
import Categories from "../categories/Categories";
import "./accomodations.less";
import "./../layout/homeLayout.less";
import beach from "./images/beach1.jpg"
import { useEffect } from "react";


const Accomodations = (): ReactElement => {

useEffect(() => {
  window.scroll(0,0)
}, [])

  return (
    <div>
      <img className="imageAccomodation" src={beach} alt="Img not found" />

      <div className="accomodationsDiv">

        <div className="descriptionBackground">
          <div className="titleHotel">
            ACCOMMODATIONS
        </div>
          <h3 className="subtitle2">
            Find the Perfect Retreat for You
            </h3>

          <br></br>
          <h4 className="description">
            Accommodations at Henry Hotel a tranquil escape for mind and body. Our palapa-style bungalows and beach houses showcase Mayan-inspired architecture, with thatched roofs, traditional materials, and local decor, while the surrounding gardens and greenery make you feel one with nature. Staying here, you’ll enjoy a carefree, unplugged escape — our rooms do not feature TVs, though we provide Wi-Fi just in case you need help staying connected and entertained.
          </h4>
        </div>

      </div>
      <Categories />
    </div>
  );
};

export default Accomodations;
