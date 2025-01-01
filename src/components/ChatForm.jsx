import {useRef} from "react";

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {
    const inputRef = useRef();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;

        console.log(userMessage);
        inputRef.current.value = '' // Clearing the input field after sending a message

        // Update chat history with users message
        setChatHistory(history => [...history, { role: "user", text: userMessage }]);

        // Add a "Thinking..." placeholder for the bot's response
        setTimeout(() => setChatHistory(history => [...history, { role: "model", text: "Thinking..." }]),600);

        //Call the function to generate the bot's response
        generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    };

    return (
        <form action='#' className='chat-form' onSubmit={handleFormSubmit}>
            <input ref={inputRef} type='text' placeholder='Your message here...' className='message-input' required/>
            <button className="material-symbols-outlined">
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;