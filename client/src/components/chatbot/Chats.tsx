import React, { useState, useEffect, useRef } from "react";
import "./Chats.less";

interface Props {
  userResponse: string;
  botResponse: {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
  };
  sendUserResponse: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  sender: string;
}

const Chats: React.FC<Props> = props => {
  const [messages, setMessages] = useState<MessagesInfo[]>([
    {
      purpose: "introduction",
      message:
        `Hi there! If you’re here, that means you’re looking for some guidance.
        Tell me, what’s your name?`,
      sender: "bot"
    }
  ]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // stacking up messages
  useEffect(() => {
    if (props.sendUserResponse) {
      setMessages((e) => [...e, { message: props.sendUserResponse, sender: "user" }]);
    }

  }, [props.sendUserResponse]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (props.botResponse) {
        setMessages((e) => [...e, props.botResponse]);
      }
    }, 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [props.botResponse])

  // enable autoscroll after each message
  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [messages]);

  let i = 0;
  return (
    <div className="message-container" ref={bodyRef}>
      {messages.map(chat => (
        <div key={`${chat.message}${i++}`}>
          {
            chat.message !== '' &&
            <div className={`message ${chat.sender}`}>
              <p>{chat.message}</p>
            </div>
          }
          {chat.options ? (

            <div className="options">
              <div>
                <i className="far fa-hand-pointer"></i>
              </div>
              {chat.options.map(option => (
                <p
                  onClick={e => props.optionClick(e)}
                  data-id={option}
                  key={`${i++}${option}`}
                >
                  {option}
                </p>
              ))}
            </div>

          ) : null}
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
