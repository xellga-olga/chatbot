import ChatbotIcon from "./components/ChatbotIcon.jsx";
import ChatForm from "./components/ChatForm.jsx";
import {useEffect, useRef, useState} from "react";
import ChatMessage from "./components/ChatMessage.jsx";

const App = () => {

    const [chatHistory, setChatHistory] = useState([]);
    const chatBodyRef = useRef();
    const [showChatbot, setShowChatbot] = useState(false);

    const generateBotResponse = async (history) => {
        // Helper function to update chat history
        const updateHistory = (text, isError = false) => {
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: 'model', text, isError}]);
        }
        // Format chat history for API request
        history = history.map(({role, text}) => ({role, parts: [{text}]}))
        const requestOptions ={
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({contents: history}),
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message || "Something went wrong!");
            console.log(data);
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponseText);
        } catch (error) {
            updateHistory(error.message, true);
        }
    }

    useEffect(() => {
        // Auto-scroll whenever chat history updates
        chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
    }, [chatHistory]);

    return (
        <div className=''>
            <div className='app'>
                <h1>Hello! 👋</h1>
                <h2>I’m your virtual assistant, here to help you with any questions you have.</h2>
                <h2>Let’s get started!</h2>
            </div>
            <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
                <button id='chatbot-toggler' onClick={() => setShowChatbot((prev) => !prev)}>
                <span className="material-symbols-outlined">
                    mode_comment
                </span>
                    <span className="material-symbols-outlined">
                    close
                </span>
                </button>
                <div className='chatbot'>
                    {/*Chatbot Header*/}
                    <div className='chatbot-header'>
                        <div className='header-info'>
                            <ChatbotIcon/>
                            <h2 className='logo-text'>Chatbot</h2>
                        </div>
                        <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-outlined">
                            keyboard_arrow_down
                        </button>
                    </div>
                    {/*Chatbot Body*/}
                    <div ref={chatBodyRef} className='chatbot-body'>
                        <div className='message bot-message'>
                            <ChatbotIcon/>
                            <p className='message-text'>
                                 How can I help you today?
                            </p>
                            <div className="quick-replies">
                                <button onClick={() => {
                                    const newHistory = [...chatHistory, {role: 'user', text: "Tell me a joke"}];
                                    setChatHistory(newHistory);
                                    generateBotResponse(newHistory);
                                }}>
                                    Tell me a joke
                                </button>
                                <button onClick={() => {
                                    const newHistory = [...chatHistory, {role: 'user', text: "Give me a quote"}];
                                    setChatHistory(newHistory);
                                    generateBotResponse(newHistory);
                                }}>
                                    Give me a quote
                                </button>
                            </div>
                        </div>

                        {/*Render the chat history dynamically*/}

                        {chatHistory.map((chat, index) => (
                            <ChatMessage key={index} chat={chat}/>
                        ))}

                    </div>
                    {/*Chatbot Footer*/}
                    <div className='chatbot-footer'>
                        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory}
                                  generateBotResponse={generateBotResponse}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;