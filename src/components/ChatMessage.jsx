import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import chatbot from '../images/chatbot.png';
import user from '../images/user.png';
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('sql', sql);

// const formatApiResponse = (response) => {
//   // Check for null or undefined response first and handle uniformly
//   if (response == null) {
//     return <p>No data available</p>;
//   }

//   if (typeof response === 'string') {
//     // Detect URLs within the text
//     const urlRegex = /(\bhttps?:\/\/\S+\b)/g; // Simple regex for URLs
//     return (
//       <div>
//         {response.split(/(\*\*.*?\*\*)/g).flatMap((part, index) => {
//           if (part && part.match(/^\*\*.*\*\*$/)) {
//             return [<b key={index}>{part.replace(/\*\*/g, '')}</b>];
//           } else if (part && urlRegex.test(part)) {
//             return part.split(urlRegex).map((subpart, subIndex) => {
//               if (urlRegex.test(subpart)) {
//                 return <a key={`${index}-${subIndex}`} href={subpart} target="_blank" rel="noopener noreferrer">{subpart}</a>;
//               }
//               return subpart;
//             });
//           }
//           return part || null;
//         })}
//       </div>
//     );
//   } else if (Array.isArray(response)) {
//     // Handle arrays, specifically for cases like the medical codes
//     if (response.length === 0) {
//       return <p>No data available</p>;
//     }
//     const headers = response[0] ? Object.keys(response[0]) : [];
//     return (
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//         <thead>
//           <tr>
//             {headers.map((header, index) => (
//               <th key={index} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {response.map((item, index) => (
//             <tr key={index}>
//               {Object.entries(item).map(([key, value], subIndex) => (
//                 <td key={subIndex} style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   } else if (typeof response === 'object') {
//     // Check for empty object
//     if (Object.keys(response).length === 0) {
//       return <p>No data available</p>;
//     }
//     return Object.keys(response).map((key, index) => {
//       if (response[key] == null) {
//         return (
//           <div key={index}>
//             <h3>{key}</h3>
//             <p>Unavailable data</p>
//           </div>
//         );
//       }

//       const valueIsSimple = Object.values(response[key]).every(
//         item => typeof item !== 'object' || item === null
//       );

//       return (
//         <div key={index}>
//           <h3>{key}</h3>
//           <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//             <tbody>
//               {valueIsSimple ?
//                 Object.entries(response[key]).map(([subKey, value], subIndex) => (
//                   <tr key={subIndex}>
//                     <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{subKey}</td>
//                     <td style={{ border: '1px solid black', padding: '8px' }}>{value.toString()}</td>
//                   </tr>
//                 )) :
//                 Object.entries(response[key]).map(([subKey, subValue], subIndex) => (
//                   <tr key={subIndex}>
//                     <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{subKey}</td>
//                     <td style={{ border: '1px solid black', padding: '8px' }}>
//                       {typeof subValue === 'object' ? JSON.stringify(subValue, null, 2) : subValue.toString()}
//                     </td>
//                   </tr>
//                 ))
//               }
//             </tbody>
//           </table>
//         </div>
//       );
//     });
//   } else {
//     // Convert other non-object, non-string types to string
//     return String(response);
//   }
// };

const formatApiResponse = (response) => {
  // Return a message when response is null or undefined
  if (!response) {
    return <p>No data available</p>;
  }

  // Handling string responses
  if (typeof response === 'string') {
    const urlRegex = /(\bhttps?:\/\/\S+\b)/g; // Regex to detect URLs
    return (
      <div>
        {response.split(/(\*\*.*?\*\*)/g).flatMap((part, index) => {
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

  // Handling array responses (like lists of data)
  if (Array.isArray(response)) {
    if (response.length === 0) {
      return <p>No data available</p>;
    }
    const headers = Object.keys(response[0] || {});
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
          {response.map((item, index) => (
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

  // // Handling object responses
  // if (typeof response === 'object') {
  //   const keys = Object.keys(response);
  //   if (keys.length === 0) {
  //     return <p>No data available</p>;
  //   }
  //   return keys.map((key, index) => (
  //     <div key={index}>
  //       <h3>{key}</h3>
  //       {response[key] == null ? (
  //         <p>Unavailable data</p>
  //       ) : (
  //         <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
  //           <tbody>
  //             {Object.entries(response[key]).map(([subKey, subValue], subIndex) => (
  //               <tr key={subIndex}>
  //                 <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{subKey}</td>
  //                 <td style={{ border: '1px solid black', padding: '8px' }}>
  //                   {typeof subValue === 'object' ? JSON.stringify(subValue, null, 2) : subValue.toString()}
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       )}
  //     </div>
  //   ));
  // }

  // Convert other non-object, non-string types to string
  return String(response);
};

const ChatMessage = ({ chatLog, chatbotImage, userImage, showResponse, storedResponse }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [chatLog, showResponse]);

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


