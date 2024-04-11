import React from 'react'

import { UiDataContext } from "../../contextapi/UiDataProvider.jsx";
import { ChatMessagesContext } from "../../contextapi/ChatMessagesProvider.jsx";
import { main } from "../../http/request";
const ChatPromptMessagesUi = () => {
    const { messages, dispatchMessages } = React.useContext(ChatMessagesContext);
    const { uiData, dispatchUiData } = React.useContext(UiDataContext);

    return (
        <div className='text-white'>
            {messages.messageList.map((message, index) => {
                return (
                    <div key={index}>
                        {message.role === 'user' &&
                            <UserMessageUi prompt={`${message?.content[0]?.text.split(" Here's whole code.")[0]}`} />
                        }
                        {message.role === 'assistant' ? uiData.chatScreenStatus != "followUpReviewAction" && messages.messageList.length - 1 == index ?
                            <FollowUpAndAssistantMessageUi prompt={`${message?.content}`} />
                            :
                            <AssistantMessageUi prompt={`${message?.content}`} /> : ''
                        }
                    </div>
                );
            })}
            {messages.takeScreenshot && <ScreenshotImageCard image={messages.image} />}
            {uiData.chatScreenStatus === 'followUpAskQuestion' && <FollowUpAskQuestionUi />}
            {uiData.chatScreenStatus === 'followUpReviewAction' && <FollowUpReviewActionUi />}
        </div>
    )
}

export default ChatPromptMessagesUi

const UserMessageUi = ({ prompt }) => {

    return (
        <div className='chat-prompt-user-message-container'>
            <div className='chat-prompt-user-message-text-container'>
                <div>
                    <div className='chat-prompt-user-message-container-header-text-container'>
                        <h3 className='chat-prompt-user-message-container-header-text'>
                            <strong>You</strong> asked:
                        </h3>
                    </div>
                    <div className='chat-prompt-user-message-container-footer-text-container'>

                        <pre className='chat-prompt-user-message-container-footer-text'>
                            {prompt}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
const AssistantMessageUi = ({ prompt }) => {
    return (

        <div className='chat-prompt-assistant-message-container'>
            <div className='chat-prompt-assistant-message-text-container'>
                <div>
                    <div className='chat-prompt-assistant-message-container-header-text-container'>
                        <h3 className='chat-prompt-assistant-message-container-header-text'>
                            <strong>Rigorous Raven</strong> says:
                        </h3>
                    </div>
                    <div className='chat-prompt-assistant-message-container-text-box'>
                        <pre className='chat-prompt-assistant-message-container-text'>
                            {prompt}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
const FollowUpAndAssistantMessageUi = ({ prompt }) => {
    const { uiData, dispatchUiData } = React.useContext(UiDataContext);

    return (

        <div className='chat-prompt-assistant-message-follow-up-container'>
            <img className='chat-prompt-assistant-message-follow-up-container-avater' src="/imoje-charecters/raven-prof.png" alt="Avatar" />
            <div className='chat-prompt-assistant-message-follow-up-text-container'>
                <div className='chat-prompt-assistant-message-follow-up-content'>
                    <h3 className='chat-prompt-assistant-message-follow-up-container-header-text'>
                        <strong>Rigorous Raven</strong> says:
                    </h3>
                    <div className='chat-prompt-assistant-message-follow-up-text-box'>
                        <div className='chat-prompt-assistant-message-follow-up-text-box-triangle'></div>
                        <pre className='chat-prompt-assistant-message-follow-up-assistant-text'>
                            {prompt}
                        </pre>
                    </div>
                </div>
                {uiData.chatScreenStatus !== 'followUpAskQuestion' &&
                    <div className='follow-up-button-section'>
                        <div className='buttons follow-up-buttons'>
                            <div className='danger button-container'>
                                <button className='unclicked btn'>Report</button>
                            </div>
                            <div className='passive button-container'>
                                <button className='unclicked btn btn-big-x-padding'

                                    onClick={() => dispatchUiData({ type: 'setChatScreenStatus', payload: 'followUpReviewAction' })}
                                >Thanks, That's all!</button>
                            </div>
                            <div className='progressive button-container'>
                                <button className='unclicked btn btn-big-x-padding'
                                    onClick={() => dispatchUiData({ type: 'setChatScreenStatus', payload: 'followUpAskQuestion' })}
                                >Ask Follow-Up</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
const FollowUpAskQuestionUi = () => {
    const preQuestionList = [
        'What dose this do?',
        'Teach me more!',
        'Show an example?'
    ]
    const [prompt, setPrompt] = React.useState("");
    const { messages, dispatchMessages } = React.useContext(ChatMessagesContext);
    const { uiData, dispatchUiData } = React.useContext(UiDataContext);
    const [responseMessage, setResponseMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const code = "code"
    const submitHandler = async () => {
        setIsLoading(true);
        const msg = messages.messageList.length <= 1 ? "Here's whole code. " + "\n " + messages.code : ''
        const newMessage = {
            role: "user",
            content: [
                { type: "text", text: prompt + "\n " + msg },
                {
                    type: "image_url",
                    image_url: {
                        url: messages?.image,
                    },
                },
            ],
        };
        try {
            const response = await main(messages.messageList, newMessage);
            // const response = await askGPT4Vision(prompt, image);
            setResponseMessage(response?.message?.content);
            dispatchMessages({ type: "setMessage", payload: [newMessage, response.message] });
            dispatchMessages({ type: "setTakeScreenshot", payload: false });
            dispatchUiData({ type: 'setChatScreenStatus', payload: '' })
            console.log(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }

    };

    const closeHandler = () => {
        setPrompt("");
        setResponseMessage("");
        setIsLoading(false);
    };
    return (

        <div className='chat-prompt-ask-followup-question-container'>
            <div className='chat-prompt-ask-followup-question-container-triangle'></div>
            <div className='chat-prompt-ask-followup-question-text-container'>
                <div>
                    <div className='chat-prompt-ask-followup-premade-question-container'>
                        <button className='premade-question-scroller-action-btn'>
                            <img src='/images/left-arrow.svg' />
                        </button>
                        <div className='chat-prompt-ask-followup-premade-question-list-container'>
                            <div className='chat-prompt-ask-followup-premade-question-list'>
                                {preQuestionList.map((question, index) => {
                                    return (
                                        <div key={index} className='chat-prompt-ask-followup-premade-single-question'
                                            onClick={() => { setPrompt(question) }}
                                        >
                                            <button className='chat-prompt-ask-followup-premade-question-btn'>{question}</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <button className='premade-question-scroller-action-btn'>
                            <img src='/images/right-arrow.svg' />
                        </button>
                    </div>
                    <div className='chat-prompt-ask-followup-question-container-input-text-container'>

                        <input className='chat-prompt-ask-followup-question-container-text-input'
                            type='text'
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>
                    <div className='buttons ask-followup-action-container'>
                        <div className='progressive'>
                            <button className='unclicked ask-followup-button'
                                onClick={submitHandler}
                            >Ask Regorous Raven</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const FollowUpReviewActionUi = () => {

    const { uiData, dispatchUiData } = React.useContext(UiDataContext);
    const handleLike = () => {
        dispatchUiData({ type: 'setScreen', payload: 'editor' })
    }
    const handleDisLike = () => {
        dispatchUiData({ type: 'setScreen', payload: 'editor' })
    }
    return (

        <div className='chat-prompt-user-review-action-container'>
            <div className='chat-prompt-user-review-action-text-container'>
                <div>
                    <div className='chat-prompt-user-review-action-container-header-text-container'>
                        <h3 className='chat-prompt-user-review-action-container-header-text'>
                            <strong>Thank you for asking for help!</strong> Did you find this useful?
                        </h3>
                    </div>
                    <div className='chat-prompt-user-review-action-container-buttons'>
                        <button
                            onClick={handleDisLike}
                        >
                            <img src='/imoje-charecters/un-like-image.png' />
                        </button>
                        <button
                            onClick={handleLike}
                        >
                            <img src='/imoje-charecters/like-image.png' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const ScreenshotImageCard = ({ image }) => {
    return (

        <div className='chat-prompt-user-screenshot-container'>
            <div className='chat-prompt-user-screenshot-image'>
                <img src={image} alt='screenshot' />
            </div>
        </div>
    )
}