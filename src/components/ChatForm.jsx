import {useRef} from "react";

const ChatForm = () => {
    const inputRef = useRef();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;

        console.log(userMessage);
        inputRef.current.value = '' //Clearing the input field after sending a message
    }

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