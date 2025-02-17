import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import chatbot from '../images/chatbot.png';
import user from '../images/user.png';
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('sql', sql);

const formatApiResponse = (response) => {
  if (!response) return '';
  // Replace **text** with bold markup
  return response.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <b key={index}>{part.replace(/\*\*/g, '')}</b>;
    }
    return part;
  });
};

const ChatMessage = ({ chatLog, chatbotImage, userImage, showResponse, storedResponse }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [chatLog, showResponse]);

  // const [displayedChats, setDisplayedChats] = useState([]);

  // useEffect(() => {
  // //   chatLog.forEach((chat, i) => {
  // //     if (chat.role === 'assistant') {
  // //       let content = chat.content;
  // //       let currentContent = '';
  // //       let index = 0;

  // //       const intervalId = setInterval(() => {
  // //         if (index < content.length) {
  // //           currentContent += content.charAt(index);
  // //           index++;
  // //           setDisplayedChats((prevChats) => {
  // //             let newChats = [...prevChats];
  // //             if (newChats[i]) {
  // //               newChats[i] = { ...newChats[i], content: currentContent };
  // //             } else {
  // //               newChats[i] = { ...chat, content: currentContent };
  // //             }
  // //             return newChats;
  // //           });
  // //         } else {
  // //           clearInterval(intervalId);
  // //         }
  // //       }, 50); // Adjust this to control speed of text streaming

  // //       return () => clearInterval(intervalId);
  // //     } else {
  // //       // For user messages, display immediately without streaming
  // //       setDisplayedChats(prevChats => {
  // //         let newChats = [...prevChats];
  // //         newChats[i] = { ...chat };
  // //         return newChats;
  // //       });
  // //     }
  // //   });
  // // }, [chatLog]); // Re-run effect only when chatLog changes


  return (
    <Box sx={{ width: '100%', padding: '10px 0' }}>
      {chatLog.map((chat, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: chat.role === 'assistant' ? 'flex-start' : 'flex-end',
            marginBottom: '10px',
          }}
        >
          <Paper
            elevation={2}
            sx={{
              backgroundColor: chat.role === 'assistant' ? '#fff' : '#e0f7fa',
              padding: '12px',
              borderRadius: '15px',
              maxWidth: '80%',
              width: 'fit-content',
              boxShadow: '0px 0px 7px #898080',
              color: '#1a3673',
            }}
          >
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {chat.role === 'assistant' ? (
                <img
                  src={chatbotImage}
                  alt="Chatbot"
                  style={{ width: 32, height: 32, borderRadius: '50%', marginRight: '8px' }}
                />
              ) : null}
              <Typography
                variant="body2"
                sx={{ fontSize: 14, fontWeight: 'bold', whiteSpace: 'pre-line' }}
              >
                {chat.role === 'assistant'
                  ? formatApiResponse(chat.content)
                  : chat.content}
              </Typography>
              {chat.role === 'user' ? (
                <img
                  src={userImage}
                  alt="User"
                  style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: '8px' }}
                />
              ) : null}
            </Box> */}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {chat.role === 'assistant' ? (
                <img
                  src={chatbotImage}
                  alt="Chatbot"
                  style={{ width: 32, height: 32, borderRadius: '50%', marginRight: '8px' }}
                />
              ) : null}
              <Typography
                variant="body2"
                sx={{ fontSize: 14, fontWeight: 'bold', whiteSpace: 'pre-line' }}
              >
                {chat.isSQLResponse ? (
                  <pre><code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{chat.content}</code></pre>
                ) : (
                  chat.role === 'assistant'
                    ? formatApiResponse(chat.content)
                    : chat.content
                )}
              </Typography>
              {chat.role === 'user' ? (
                <img
                  src={userImage}
                  alt="User"
                  style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: '8px' }}
                />
              ) : null}
            </Box>

          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessage;


