import React from 'react'
import CodeEditorView from './CodeEditorView'
import ChatView from "./ChatView.jsx";
import { UiDataContext } from '../contextapi/UiDataProvider.jsx';


const MainView = () => {
  const { uiData, dispatchUiData } = React.useContext(UiDataContext);
  return (
    <div>
      <div style={{display: `${uiData.screen === 'editor' ? 'block': 'none'}`}}>
      <CodeEditorView />
      </div>
      <div style={{display: `${uiData.screen === 'chat' ? 'block': 'none'}`}}>
      <ChatView />
      </div>
    </div>
  )
}

export default MainView