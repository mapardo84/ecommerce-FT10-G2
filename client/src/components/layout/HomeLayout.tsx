import { useEffect, useState } from "react";
import { Layout } from "antd";
import { NavBar } from "../NavBar/NavBar";
import { FooterLayout } from '../footer/Footer'
import { HomeSlides } from "../HomeSlides/HomeSlides";
import { supabase } from "../../SupaBase/conection";
import { getSession } from "../../helpers/logIn"
import "./homeLayout.less";
import { useDispatch, useSelector } from "react-redux";
import { getPromotions } from "../../actions/Promotions/promotionsAction";
import '../Promotions/PromotionsViewer.less';
import HomeDescription from "../home/homeDescription/HomeDescription";
import { HomeExperiences } from "../home/homeExperiences/HomeExperiences";
import HomeDiscounts from "../home/homeDiscounts/HomeDiscounts";
import Chatbot from "../chatbot/Chatbot";
import { HomeNewsletter } from "../home/homeNewsletter/HomeNewsletter";
import { HomeFeatures } from '../home/HomeFeatures/HomeFeatures'
import { getUserProfile } from "../../actions/userProfile/userProfileActions";
import { RootReducer } from "../../reducers/rootReducer";
import Modal from "antd/lib/modal/Modal";
import { UpdateRegister } from "../LogIn/UpdateRegister";
const { Content } = Layout;

export const HomeLayout = (): JSX.Element => {

  var [name, setName] = useState("empty");
  const dispatch = useDispatch();
  const promotions = useSelector((state: any) => state.promotions)
  const userProfile = useSelector((state: RootReducer) => state.userProfile)
  const number = useSelector((state: any) => state.login)

  const [updateRegister, setUpdateRegister] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase.auth.onAuthStateChange((_, session) => {
      getSession(session);
    });
    dispatch(getPromotions());
    dispatch(getUserProfile())
  }, [dispatch, number]);

  useEffect(() => {
    if (userProfile?.data?.uuid) {
      if (userProfile?.data?.uuid?.length > 24) {
        setUpdateRegister(true)
      } else {
        setUpdateRegister(false)
      }
    }
  }, [userProfile, number])


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
          {promotions && <HomeDiscounts />}
          <Chatbot />
          <HomeFeatures />
          <HomeNewsletter />
        </Content>
        <FooterLayout />
      </Layout>
      <Modal
        footer={null}
        visible={updateRegister}>
        <UpdateRegister />
      </Modal>
    </>
  );
};

export default HomeLayout;