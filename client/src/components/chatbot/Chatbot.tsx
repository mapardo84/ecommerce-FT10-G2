import React, { useEffect, useState } from "react";
import Chats from "../chatbot/Chats";
import { analyzeNextSteps } from "../chatbot/analyzeNextSteps";
import "./Chatbot.less";
import { getAllCategories } from "../../Admin/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllHalls } from "../../Admin/actions/adminEventsActions";
import { BsChatDotsFill } from "react-icons/bs"


interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
}


const Chatbot: React.FC = () => {
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot"
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");
  const dispatch = useDispatch()


  const { categories } = useSelector((state: any) => state?.categories);
  const { halls } = useSelector((state: any) => state?.adminEvents);

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllHalls())
}, [dispatch])

  // setting next step when there's response and option click
  const setNextStep = (response: string, categoryOrHall: any) => {
    setStep(prevState => prevState + 1);
    setSendUserResponse(response);
    let res = analyzeNextSteps(step, response, categoryOrHall, categories, halls);
    setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");

  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;

    if (option) {
      let category = categories?.find( (cat:any) => cat?.name?.includes(option))
      let hall = halls?.find( (h:any) => h?.name?.includes(option))
      let nohall = { name: 'nohall'}
      if(category) {
        setNextStep(option, category)
      } else {
        if(hall) {
          setNextStep(option, hall)
        } else {
          setNextStep(option, nohall)
        }
      }
  }
  }
  // event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse, null);
  };

  const [visibleBot, setvisibleBot] = useState(false)

  const changev = () => {
    setvisibleBot(!visibleBot)
  }


  return (
    <div className={visibleBot ? "help-button-wrapper expanded" : "help-button-wrapper"}>
      <div className="help-list">
        <div className="chat-container">
          <Chats
            userResponse={userResponse}
            botResponse={botResponse}
            sendUserResponse={sendUserResponse}
            optionClick={optionClick}
          />
          <form onSubmit={e => handleSubmit(e)} className="form-container">
            <input
              onChange={e => handleInputChange(e)}
              value={userResponse}
            ></input>
            <button>
              <i className="far fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <button onClick={changev} className="help-button">
        <BsChatDotsFill style={{ fontSize: "30px", color: "white" }} />
      </button>
    </div>
  );
};

export default Chatbot;
