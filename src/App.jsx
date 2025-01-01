import ChatbotIcon from "./components/ChatbotIcon.jsx";
import ChatForm from "./components/ChatForm.jsx";

const App = () => {
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

                    <div className='message user-message'>

                        <p className='message-text'>
                           Lorem, ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                        </p>
                    </div>
                </div>
                {/*Chatbot Footer*/}
                <div className='chatbot-footer'>
                    <ChatForm />
                </div>
            </div>
        </div>
    );
}

export default App;