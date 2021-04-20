import { useEffect, useState } from "react";
import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import { HomeSlides } from "../HomeSlides/HomeSlides";
import { supabase } from "../../SupaBase/conection";
import { getSession } from "../../helpers/logIn"
import "./homeLayout.less";

const { Content } = Layout;


export const HomeLayout = (): JSX.Element => {

  var [name, setName] = useState("empty")

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase.auth.onAuthStateChange((event, session) => {
      getSession(session)
    })
  }, [])


  const showName = async () => {
    const user: any = supabase.auth.user()
    if (user?.aud === "authenticated") {

      var { data } = await supabase
        .from('users')
        .select('first_name')
        .eq('email', user.email)
      setName(data && data[0]?.first_name)

    } else return false
  }
  showName()

  return (
    <>


      <Layout className="container">
        <NavBar />
        {
          name !== "empty" && <div className="welcomeBox">Welcome, {name}</div>
        }
        <Content>
          <HomeSlides />
          <div className="text">
            <div className="titleHotel">HOTEL HENRY</div>
            <h3 className="subtitle">
              {" "}
              A luxurious hotel, open the door to a whole new world.
            </h3>{" "}
            <h3 className="subtitle2">
              {" "}
              Feel the difference and prepare for a beautiful traveling
              experience.
            </h3>
            <h4 className="description">
              The Henry Hotel on Miami Beach in South Beach, Florida is in an
              amazing location, overlooking more than 200 feet of beautiful
              white sandy tropical beaches on the Atlantic Ocean.{" "}
            </h4>

            <h4 className="description">
              Built in 2009 and completely renovated in 2018, our modern Miami
              hotel offers the highest levels of luxury and comfort. Our leisure
              facilities include two hot tubs, a state of the art gym with
              unbeatable panoramic sunset views, as well as three different
              swimming pools, including 2 beach level family pools and our top
              floor tranquility pool adults only offering something for every
              guest.
            </h4>
            <h4 className="description">
              it is perfect for romantic getaways, family vacations, spectacular
              reunions and events. Unplug and relax with a poolside drink, soak
              up some sun on the sand, or enjoy a relaxing spa massage or one of
              our Mayan-inspired treatments. Adventurers will want to explore
              ancient sites and natural treasures, snorkel through colorful
              reefs teeming with tropical fish, swim with turtles, discover the
              magic of cenotes, our Dive Center has been open for more than 35
              years. meet friendly people in the city.
            </h4>
            <h4 className="description">
              Whether visiting for work or relaxation, The Henry Hotel offers a
              wide range of comfort and convenience to accommodate our valued
              guests.
            </h4>
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};

export default HomeLayout;
