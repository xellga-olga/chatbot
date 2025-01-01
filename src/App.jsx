import ChatbotIcon from "./components/ChatbotIcon.jsx";
import ChatForm from "./components/ChatForm.jsx";
import {useState} from "react";
import ChatMessage from "./components/ChatMessage.jsx";

const App = () => {

    const [chatHistory, setChatHistory] = useState([]);

    const generateBotResponse = (history) => {
        console.log(history);
    }

    return (
        <div className='container'>
            <div className='chatbot'>
                {/*Chatbot Header*/}
                <div className='chatbot-header'>
                    <div className='header-info'>
                        <ChatbotIcon/>
                        <h2 className='logo-text'>Chatbot</h2>
                    </div>
                    <button className="material-symbols-outlined">
                       keyboard_arrow_down
                    </button>
                </div>
                {/*Chatbot Body*/}
                <div className='chatbot-body'>
                    <div className='message bot-message'>
                        <ChatbotIcon/>
                        <p className='message-text'>
                            Hey there! <br/> How are you? How can I help you today?
                        </p>
                    </div>

                    {/*Render the chat history dynamically*/}

                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}

                </div>
                {/*Chatbot Footer*/}
                <div className='chatbot-footer'>
                    <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                </div>
            </div>
        </div>
    );
}

export default App;