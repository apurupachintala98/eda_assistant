import React, { useEffect } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import chatbot from '../images/chatbot.png';
import user from '../images/user.png';
const ChatMessage = ({ chatLog, chatbotImage, userImage }) => {

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
              transition: 'width 0.3s ease',
              borderRadius: '15px',
              maxWidth: '80%', // Limits width to 80% of container
              width: 'fit-content',
              alignSelf: chat.role === 'assistant' ? 'flex-start' : 'flex-end', // Align messages based on role
              boxShadow: '0px 0px 7px #898080',
              color: '#1a3673',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: chat.role === 'assistant' ? 'flex-start' : 'flex-end',
                marginBottom: '10px',
              }}
            >
              {chat.role === 'assistant' ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={chatbotImage}
                    alt="Chatbot"
                    style={{
                      width: 32, height: 32,
                      borderRadius: '50%', mr: 2,
                    }}
                  />
                  <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 'bold' }}>
                    {chat.content}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontSize: 14, mr: 2, fontWeight: 'bold' }}>
                    {chat.content}
                  </Typography>
                  <img
                    src={userImage}
                    alt="User"
                    style={{
                      borderRadius: '50%', width: 32, height: 32
                    }}
                  />
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessage;

