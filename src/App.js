// import React, { useState } from 'react';
// import './App.css';
// import Dashboard from './components/Dashboard';
// import logo from './images/logo.png';
// import user from './images/user.png';
// import chatbot from './images/chatbot.png';

// function App() {
//   const [data, setData] = useState(null);
//   const [suggestedPrompts, setSuggestedPrompts] = useState([
//     "Show total membership by lob for incurred month 202409",
//     "Find total procedure count by HCC for incurred period 202409?",
//     "For commercial market, Show Paid expense PMPM by mbu for incurred period 202409"
//   ]);

//   // Define the backend URL dynamically based on the frontend's protocol
//   const backendBaseUrl = "http://10.126.192.122:8010";
//     // const backendBaseUrl = "https://sfassist.edagenaidev.awsdns.internal.das/";

//   return (
//     <div >
//     <Dashboard
//     // logo={logo}
//     themeColor="#1a3673"
//     title="Chat Assistant"
//     newChatButtonLabel="New Chat"
//     // apiPath={`${backendBaseUrl}api/cortex/complete/`} 
//     apiPath={`${backendBaseUrl}/get_llm_response/`} 
//     // sqlUrl={`${backendBaseUrl}/run_sql_query/`}
//     aplctn_cd="edagnai"
//     app_id="edadip"
//     edadip_api_key="78a799ea-a0f6-11ef-a0ce-15a449f7a8b0"
//     method="cortex"
//     model="llama3.3-70b"
//     context="You are powerful AI assistant in providing accurate answers always. Be Concise in providing answers based on context."
//     // chatbotImage={chatbot}
//     suggestedPrompts={suggestedPrompts}
//     // userImage={user}
//     chatInitialMessage= "Hello there, I am your Chat Assistant. How can I help you today?" 
//     customStyles={{
//       container: {}, // Customize the container background
//         appBar: {},             // Remove AppBar shadow
//         logo: {},       // Custom logo style
//         drawer: {}, // Custom drawer border
//         newChatButton: {},    // Customize the New Chat button
//         main: {},                 // Customize the main content padding
//         chat: {
//           inputContainer: {},      // Custom styles for the input container
//           input: {},            // Custom styles for the input text
//           chatContainer: {} // Customize chat container background
//         }
//     }}
//   />
//     </div>
//   );
// }

// export default App;

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
