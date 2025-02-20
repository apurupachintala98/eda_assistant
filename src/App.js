import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import config from './config.json';  

function App() {
    return (
        <div>
            <Dashboard
                logo={require(`${config.images.logo}`)}
                themeColor={config.themeColor}
                title={config.title}
                newChatButtonLabel={config.newChatButtonLabel}
                apiPath={config.apiPaths.getResponse}
                sqlUrl={config.apiPaths.runQuery}
                aplctn_cd={config.aplctn_cd}
                app_id={config.app_id}
                edadip_api_key={config.edadip_api_key}
                method={config.method}
                model={config.model}
                context={config.context}
                chatbotImage={require(`${config.images.chatbot}`)}
                suggestedPrompts={config.suggestedPrompts}
                userImage={require(`${config.images.user}`)}
                chatInitialMessage={config.chatInitialMessage}
                customStyles={config.customStyles}
            />
        </div>
    );
}

export default App;
