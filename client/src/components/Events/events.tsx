import "./events.less";
import renderphoto from "./images/photo1.jpg"
import React, { useEffect } from "react";

import { BackTop, Card } from "antd";
import { getAllHalls } from "../../Admin/actions/adminEventsActions";
import { useDispatch} from "react-redux";


const tabListNoTitle = [
    {
      key: "greatroom",
      tab: "Great Room"
    },
    {
      key: "studio1",
      tab: "Studio 1"
    },
    {
      key: "studio2",
      tab: "Studio 2"
    },
    {
      key: "foyer3a",
      tab: "Foyer 3A"
    },{
        key: "foyer3b",
        tab: "Foyer 3B"
      },{
        key: "lounge",
        tab: "Lounge"
      }
  ];

  

  
  const contentListNoTitle:any = {
    greatroom:
    
    <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>Great Room</h1><img className="imgEventOk" src="https://media.kempinski.com/34372941/kempinski-adlonsept2018-15.jpg;width=1024;height=576;mode=crop;anchor=middlecenter;autorotate=true;quality=85;scale=both;progressive=true;encoder=freeimage;format=jpg"alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>218 m2, ceiling height 5 m. Independent direct access from plaza level. Direct access from hotel and to the lounge and restaurant. Spacious foyer with natural daylight. Built-in speaker system and screens/In house audiovisual company and support. Independent control room, ideal for simultaneous interpretation.</p></p>,
    studio1: <p>  <h1 style={{fontSize:"60px"}}>Studio 1</h1><img className="imgEventOk" src="https://media.kempinski.com/1070/bild_lounge.jpg;width=1024;height=576;mode=crop;anchor=middlecenter;autorotate=true;quality=85;scale=both;progressive=true;encoder=freeimage;format=jpg"alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>  At Hotel Adlon Kempinski Berlin, you have the option of conducting smaller private meetings in a relaxed atmosphere. At the Bundeszimmer, for example, you have a wonderful view of the Brandenburg Gate. In this pleasant and unique atmosphere, each meeting will be a unique experience.

    Our team stays in the background. Discretion is very important to us.
    
    A private lunch or dinner is of course possible in all rooms</p></p>,
    studio2:<p>ok</p>,
    foyer3a:<p>ok</p>,
    foyer3b:<p>ok</p>,
    lounge:<p>ok</p>

  };



  

export  class Events extends React.Component {
  
    async componentDidMount() {
        const resolve = await getAllHalls();
        
        console.log(resolve)
        this.setState({ data:resolve })
    }
    

      state = {
          data:[],
        key: "greatroom",
        noTitleKey: "greatroom"
      };
    
      onTabChange = (key: any, type: any) => {
        console.log(key, type);
        this.setState({ [type]: key });
      };
    
    
      render(){
        const { data } = this.state;
        return (
    
            <div className="descriptionBackground">
                {console.log(data)}
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
    <div>
    
    <Card className="CardEvent"
          style={{ width: "80%" }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          tabBarExtraContent={<a href="/events/quote">Make your quote now!
          </a>}
          onTabChange={(key) => {
            this.onTabChange(key, "noTitleKey");
          }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
          
    </div>
            </div>
            <BackTop />
            </div>
        )
    }
      }
   


