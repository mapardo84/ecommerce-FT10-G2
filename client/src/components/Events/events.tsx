import "./events.less";
import renderphoto from "./images/photo1.jpg"
import React, { useEffect, useState } from "react";
import { BackTop, Card } from "antd";
import { getAllHalls } from "../../Admin/actions/adminEventsActions";
import  {store} from "../../store/store"
import { IHalls } from "../../Admin/components/Events/Halls";
import { useDispatch, useSelector } from "react-redux";
import { DatabaseFilled } from "@ant-design/icons";
import initialStatePropsEvents from "./../../reducers/adminEventsReducer"


export const Event = () =>  {
  const [key, setKey] = useState("greatroom");
  const [noTitleKey, setNoTitleKey] = useState("greatroom");


  const dispatch = useDispatch()
  const hall = useSelector((state:  initialStatePropsEvents) => state.adminEvents.halls);
  console.log(hall)


  const getHalls = async () => {
    const resolve = await getAllHalls();
    dispatch(resolve);
  };

  
  useEffect(() => {
    getHalls()
  }, []);

  console.log(dispatch)
    // const state = {
    //   data: [],
    //   key: key,
    //   noTitleKey: "greatroom",
    // }
  

    // statee = {
    //     key: "greatroom",
    //     noTitleKey: "greatroom",
    //   };









   
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

  

//   {cat?.categoriesNames.map((category: any, i: number) => {
//     return (
//       <Option value={category.id} key={i}>{category.name}</Option>
//     )
//   })}


// async componentDidMount()  {
// await store.dispatch(getAllHalls());
// setState({data:store.getState().adminEvents?.halls})

// console.log( store.getState().adminEvents)
// console.log(state.data[0]?.name)



//  componentDidUpdate(){
// //  this.setState(store.getState().adminEvents.halls) 
// console.log("ENTRE")
// }




 const contentListNoTitle:any = {
   
  greatroom:<p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{hall[0]?.name}</div>}</h1><img className="imgEventOk" src={hall[0]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{hall[0]?.description}</p></p>,
 

  studio1: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{hall[1]?.name}</div>}</h1><img className="imgEventOk" src={hall[1]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{hall[1]?.description}</p></p>,

 studio2: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{hall[2]?.name}</div>}</h1><img className="imgEventOk" src={hall[2]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{hall[2]?.description}</p></p>,

  foyer3a: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{hall[3]?.name}</div>}</h1><img className="imgEventOk" src={hall[3]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{hall[3]?.description}</p></p>,

  foyer3b: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{hall[4]?.name}</div>}</h1><img className="imgEventOk" src={hall[4]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{hall[4]?.description}</p></p>,

  lounge: <p className="contentEvents">  <h1 style={{fontSize:"60px"}}>{<div>{hall[5]?.name}</div>}</h1><img className="imgEventOk" src={hall[5]?.image}alt="Img not found" /><br></br><br></br><p ></p ><p style={{fontSize:"20px"}}>{hall[5]?.description}</p></p>,

};
    
  const onTabChange = (key: any, type: any) => {
        console.log(key, type);
        setKey(key)
        setNoTitleKey(type)
       
      };
    
     


      
      
        // console.log(state.data[0]?.name)

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
      tabList={tabListNoTitle}
      activeTabKey={key}
      tabBarExtraContent={<a href="/events/quote">Make your quote now!
      </a>}
      onTabChange={(key) => {
        onTabChange(key, "noTitleKey");
      }}
    >
      {contentListNoTitle[key]}
    </Card>
  </div>
        </div>
        <BackTop />
        </div>
      )
     }


  



    
  



    
      
   


