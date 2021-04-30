import "./events.less";
import renderphoto from "./images/photo1.jpg"
import { useEffect } from "react";
import { BackTop } from "antd";


export  const Events = () => {
    useEffect(() => {
        window.scroll(0, 0)
      }, [])
    
    return (
        <div className="descriptionBackground">
             <img className="imageAccomodation" src={renderphoto} alt="Img not found" />
        <div >
            <div className="titleHotel">
            EVENTS
            </div>
            <h3 className="subtitle2">
        Dare To Do Meetings Differently
            </h3>
        <p className="description">
        Go longer at Miami Beach. Connect to clients and employees with fun, fresh conferences in one of nine distinct meeting rooms. Our Great Room borders excess with a bright foyer and an attached W Lounge for mingling and networking.  Illuminate your conference with ideal AV equipment such as wired and wireless Internet and LCD projectors. Our Talent includes on-site photographers with TV production services, perfect for capturing the highlights. Our meeting experts make sure to include Recess™, our playful activity menu that breaks up the monotony. Energize with custom catering and prepare for the next gathering at our Wired business center, offering translators, messenger delivery, copy and fax services and more in South Beach, Florida.
        </p>

        </div>
        <BackTop />
        </div>
    )
}


