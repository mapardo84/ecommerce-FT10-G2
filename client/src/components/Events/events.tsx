import "./events.less";
import renderphoto from "./images/photo1.jpg"
import React from "react";
import { BackTop, Card } from "antd";
import { getAllHalls } from "../../Admin/actions/adminEventsActions";
import  {store} from "../../store/store"
import { IHalls } from "../../Admin/components/Events/Halls";



export  class Events extends React.Component {
constructor(props:any){
    super(props)
    this.state = []
}


    statee = {
        key: "greatroom",
        noTitleKey: "greatroom",
      };


    async componentDidMount() {
        await store.dispatch(getAllHalls());
            this.setState(store.getState().adminEvents) 
 
   console.log( store.getState().adminEvents)
   let x = this.state
   console.log(this.state)
   }


 tabListNoTitle = [
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

  

//   {cat?.categoriesNames.map((category: any, i: number) => {
//     return (
//       <Option value={category.id} key={i}>{category.name}</Option>
//     )
//   })}

   contentListNoTitle:any = {
    
     greatroom: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{store.getState().adminEvents.halls[0]?.name}</div>}</h1><img className="imgEventOk" src={store.getState().adminEvents.halls[0]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{store.getState().adminEvents.halls[0]?.description}</p></p>,

    // studio1:<p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{this.events[0]?.name}</div>}</h1><img className="imgEventOk" src={this.events[0]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{this.events[0]?.description}</p></p>,

    // studio2:<p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{this.events[0]?.name}</div>}</h1><img className="imgEventOk" src={this.events[0]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{this.events[0]?.description}</p></p>,

    // foyer3a: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{this.events[0]?.name}</div>}</h1><img className="imgEventOk" src={this.events[0]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{this.events[0]?.description}</p></p>,

    // foyer3b: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{this.events[0]?.name}</div>}</h1><img className="imgEventOk" src={this.events[0]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{this.events[0]?.description}</p></p>,

    // lounge: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{this.events[0]?.name}</div>}</h1><img className="imgEventOk" src={this.events[0]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{this.events[0]?.description}</p></p>,

  };


     
    
      onTabChange = (key: any, type: any) => {
        console.log(key, type);
        this.setState({ [type]: key });
      };
    
    
      render(){
     
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
    <div>
    
    <Card className="CardEvent"
          style={{ width: "80%" }}
          tabList={this.tabListNoTitle}
          activeTabKey={this.statee.noTitleKey}
          tabBarExtraContent={<a href="/events/quote">Make your quote now!
          </a>}
          onTabChange={(key) => {
            this.onTabChange(key, "noTitleKey");
          }}
        >
          {this.contentListNoTitle[this.statee.noTitleKey]}
        </Card>
          
    </div>
            </div>
            <BackTop />
            </div>
        )
    }
      }
   


