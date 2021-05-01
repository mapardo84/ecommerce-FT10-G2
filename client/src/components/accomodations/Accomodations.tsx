import { ReactElement } from "react";
import { BackTop } from "antd";
import Categories from "../categories/Categories";
import "./accomodations.less";
import "./../layout/homeLayout.less";
import beach from "./images/beach1.jpg"
import { useEffect } from "react";


const Accomodations = (): ReactElement => {

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div>
      <div>
        <img className="imageAccomodation" src={beach} alt="Img not found" />
        <div className="ActitleHotel">
          ACCOMMODATIONS
        </div>
        <div className="AcSloganHotel">
          Find the Perfect Retreat for You...
        </div>
      </div>

      <div className="accomodationsDiv">
        <div className="descriptionBackground">
          <br></br>
          <h4 className="description">
            Accommodations at Henry Hotel a tranquil escape for mind and body. Our palapa-style bungalows and beach houses showcase Mayan-inspired architecture, with thatched roofs, traditional materials, and local decor, while the surrounding gardens and greenery make you feel one with nature. Staying here, you’ll enjoy a carefree, unplugged escape — our rooms do not feature TVs, though we provide Wi-Fi just in case you need help staying connected and entertained.
          </h4>
          <h4 className="description">

            Our selection of guest rooms, suites, casitas, tree houses, and haciendas are scattered throughout the property and offer the perfect stay for any type of traveler. You can choose to stay right at the edge of the water, on the soft sands, or tucked away amid lush greenery. We also offer connecting rooms and haciendas that can accommodate larger groups and families. Opt for our Half-Board Package, complete with daily breakfast and either lunch or dinner, or our various room and breakfast plans.
          </h4>

        </div>

      </div>
      <Categories />
      <BackTop />
    </div>
  );
};

export default Accomodations;
