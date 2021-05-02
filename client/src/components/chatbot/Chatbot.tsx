import React, { useEffect, useState } from "react";
import Chats from "../chatbot/Chats";
import { analyzeNextSteps } from "../chatbot/analyzeNextSteps";
import "./Chatbot.less";
import { getAllCategories } from "../../Admin/actions/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
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

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  // setting next step when there's response and option click
  const setNextStep = (response: string, category: any) => {
    console.log(category)
    setStep(prevState => prevState + 1);
    setSendUserResponse(response);
    let res = analyzeNextSteps(step, response, category, categories);
    setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");

  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    console.log(option)

    if (option) {
      let category = categories?.find((cat: any) => cat?.name?.includes(option))
      console.log(category)
      let nocategory = { name: 'nocategory' }
      category ? setNextStep(option, category) : setNextStep(option, nocategory)

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
