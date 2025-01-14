import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import logo from './images/logo.png';
import user from './images/user.png';
import chatbot from './images/chatbot.png';

function App() {
  const [suggestedPrompts, setSuggestedPrompts] = useState([
    "Show total membership by lob for incurred month 202409",
    "Find total procedure count by HCC for incurred period 202409?",
    "For commercial market, Show Paid expense PMPM by mbu for incurred period 202409"
  ]);
  return (
    <div >
    <Dashboard
    logo={logo}
    themeColor="#1a3673"
    title="Chat Assistant"
    newChatButtonLabel="New Chat"
    apiPath="http://10.126.192.122:8010/get_llm_response/"
    appCd="Chat_bot"
    chatbotImage={chatbot}
    suggestedPrompts={suggestedPrompts}
    userImage={user}
    chatInitialMessage= "Hello there, I am your Chat Assistant. How can I help you today?" 
    customStyles={{
      container: {}, // Customize the container background
        appBar: {},             // Remove AppBar shadow
        logo: {},       // Custom logo style
        drawer: {}, // Custom drawer border
        newChatButton: {},    // Customize the New Chat button
        main: {},                 // Customize the main content padding
        chat: {
          inputContainer: {},      // Custom styles for the input container
          input: {},            // Custom styles for the input text
          chatContainer: {} // Customize chat container background
        }
    }}
  />
    </div>
  );
}

export default App;
