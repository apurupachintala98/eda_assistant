import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import chatbot from '../images/chatbot.png';
import user from '../images/user.png';
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('sql', sql);

const ChatMessage = ({ chatLog, chatbotImage, userImage, storedResponse }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [chatLog]);

  const formatApiResponse = (storedResponse) => {
    console.log(storedResponse);
    if (!storedResponse) {
      return <p>No data available</p>;
    }
    if (typeof response === 'string') {
      try {
        const parsedResponse = JSON.parse(storedResponse);
        if (Array.isArray(parsedResponse)) {
          return renderTable(parsedResponse);  // Render as table if it's an array
        }
        // If parsed successfully but not an array, treat it as normal string content
        return renderTextWithFormatting(parsedResponse);
      } catch (error) {
        // If parsing fails, render it as a normal string, assume it's not JSON
        return renderTextWithFormatting(storedResponse);
      }
    }
  
    if (Array.isArray(storedResponse)) {
      if (response.length === 0) {
        return <p>No data available</p>;
      }
      return renderTable(storedResponse);
    }
    return String(storedResponse);
  };
  
  function renderTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data available.</p>; // Handling the case where data is not as expected
    }
    const headers = Object.keys(data[0] || {});
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key, value], subIndex) => (
                <td key={subIndex} style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  function renderTextWithFormatting(text) {
    const urlRegex = /(\bhttps?:\/\/\S+\b)/g; // Regex to detect URLs
    return (
      <div>
        {text.split(/(\*\*.*?\*\*)/g).flatMap((part, index) => {
          if (part.match(/^\*\*.*\*\*$/)) {
            // Bold text marked by double asterisks
            return [<b key={index}>{part.replace(/\*\*/g, '')}</b>];
          }
          if (urlRegex.test(part)) {
            // Splitting and linking URLs
            return part.split(urlRegex).map((subpart, subIndex) => (
              urlRegex.test(subpart) ? 
              <a key={`${index}-${subIndex}`} href={subpart} target="_blank" rel="noopener noreferrer">{subpart}</a> : 
              subpart
            ));
          }
          return part;
        })}
      </div>
    );
  }
  
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
                  <pre><code className="sql" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{chat.content}</code></pre>
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