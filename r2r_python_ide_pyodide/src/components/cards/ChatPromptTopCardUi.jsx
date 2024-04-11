import React from 'react'
import { UiDataContext } from '../../contextapi/UiDataProvider';
import { ChatMessagesContext } from '../../contextapi/ChatMessagesProvider';

const ChatPromptTopCardUi = ({headerText}) => {

    const { uiData, dispatchUiData } = React.useContext(UiDataContext);

    const { messages, dispatchMessages } = React.useContext(ChatMessagesContext);
    const handleCloseChatPrompt = () => {
        dispatchUiData({type:'setScreen', payload: 'editor'});
        dispatchMessages({type: "setTakeScreenshot", payload: false});
    }
    return (
        <div>
            <div className='chat-prompt-top-card-container'>
                <button  className='chat-prompt-top-card-close-icon'
                onClick={handleCloseChatPrompt}
                >
                    <img src='/images/close-icon.svg' alt='close-icon' />
                </button>
                <img className='chat-prompt-top-card-container-avater' src="/imoje-charecters/raven-rigorous.png" alt="Avatar" />
                <div className='chat-prompt-top-card-text-container'>
                    <div className='chat-prompt-top-card-container-header-text-container'>
                    <h3 className='chat-prompt-top-card-container-header-text'>
                        {headerText ? headerText : <>Office Hours
                        <br/>
                        are in!</>}
                    </h3>
                    </div>
                    <div className='chat-prompt-top-card-container-footer-text-container'>

                    <p className='chat-prompt-top-card-container-footer-text'>
                        Everyone needs help sometimes! Rigorous Raven is here to
                        <br/>
                        help. <span>Click on the part of the activity you need help with.</span>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPromptTopCardUi