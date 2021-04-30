import { useEffect, useState } from "react";
import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import { HomeSlides } from "../HomeSlides/HomeSlides";
import { PromotionsViewer } from '../Promotions/PromotionsViewer';
import { supabase } from "../../SupaBase/conection";
import { getSession } from "../../helpers/logIn"
import "./homeLayout.less";
import { useDispatch, useSelector } from "react-redux";
import { getPromotions } from "../../actions/Promotions/promotionsAction";
import '../Promotions/PromotionsViewer.less';
import HomeDescription from "../home/homeDescription/HomeDescription";
import { HomeExperiences } from "../home/homeExperiences/HomeExperiences";
import HomeDiscounts from "../home/homeDiscounts/HomeDiscounts";

const { Content } = Layout;

export const HomeLayout = (): JSX.Element => {

  var [name, setName] = useState("empty");
  const dispatch = useDispatch();
  const promotions = useSelector((state: any) => state.promotions)

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase.auth.onAuthStateChange((event, session) => {
      getSession(session);
    });
    dispatch(getPromotions());
  }, []);

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
          name !== "empty" && <div className="welcomeBox">Welcome {name}!</div>
        }
        <Content>
          <HomeSlides />
          <HomeDescription />
          <HomeExperiences />
          {promotions && <HomeDiscounts promo={promotions} />}
        </Content>
        <FooterLayout />
      </Layout>
    </>
  );
};

export default HomeLayout;