// import React, { useEffect, useState } from 'react';
// import { Avatar, Box, Typography, Paper } from '@mui/material';
// import chatbot from '../images/chatbot.png';
// import user from '../images/user.png';
// import hljs from 'highlight.js/lib/core';
// import sql from 'highlight.js/lib/languages/sql';
// import 'highlight.js/styles/github.css';

// hljs.registerLanguage('sql', sql);

// const formatApiResponse = (response) => {
//   if (!response) {
//     return <p>No data available</p>;
//   }
//   if (typeof response === 'string') {
//     try {
//       const parsedResponse = JSON.parse(response);
//       if (Array.isArray(parsedResponse)) {
//         return renderTable(parsedResponse);  // Render as table if it's an array
//       }
//       // If parsed successfully but not an array, treat it as normal string content
//       return renderTextWithFormatting(parsedResponse);
//     } catch (error) {
//       // If parsing fails, render it as a normal string, assume it's not JSON
//       return renderTextWithFormatting(response);
//     }
//   }

//   if (Array.isArray(response)) {
//     if (response.length === 0) {
//       return <p>No data available</p>;
//     }
//     return renderTable(response);
//   }
//   return String(response);
// };

// function renderTable(data) {
//   if (!Array.isArray(data) || data.length === 0) {
//     return <p>No data available.</p>; // Handling the case where data is not as expected
//   }
//   const headers = Object.keys(data[0] || {});
//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th key={index} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             {Object.entries(item).map(([key, value], subIndex) => (
//               <td key={subIndex} style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// function renderTextWithFormatting(text) {
//   const urlRegex = /(\bhttps?:\/\/\S+\b)/g; // Regex to detect URLs
//   return (
//     <div>
//       {text.split(/(\*\*.*?\*\*)/g).flatMap((part, index) => {
//         if (part.match(/^\*\*.*\*\*$/)) {
//           // Bold text marked by double asterisks
//           return [<b key={index}>{part.replace(/\*\*/g, '')}</b>];
//         }
//         if (urlRegex.test(part)) {
//           // Splitting and linking URLs
//           return part.split(urlRegex).map((subpart, subIndex) => (
//             urlRegex.test(subpart) ? 
//             <a key={`${index}-${subIndex}`} href={subpart} target="_blank" rel="noopener noreferrer">{subpart}</a> : 
//             subpart
//           ));
//         }
//         return part;
//       })}
//     </div>
//   );
// }

// const ChatMessage = ({ chatLog, chatbotImage, userImage, showResponse, storedResponse }) => {
//   useEffect(() => {
//     hljs.highlightAll();
//   }, [chatLog, showResponse]);

//   return (
//     <Box sx={{ width: '100%', padding: '10px 0' }}>
//       {chatLog.map((chat, index) => (
//         <Box
//           key={index}
//           sx={{
//             display: 'flex',
//             justifyContent: chat.role === 'assistant' ? 'flex-start' : 'flex-end',
//             marginBottom: '10px',
//           }}
//         >
//           <Paper
//             elevation={2}
//             sx={{
//               backgroundColor: chat.role === 'assistant' ? '#fff' : '#e0f7fa',
//               padding: '12px',
//               borderRadius: '15px',
//               maxWidth: '80%',
//               width: 'fit-content',
//               boxShadow: '0px 0px 7px #898080',
//               color: '#1a3673',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               {chat.role === 'assistant' ? (
//                 <img
//                   src={chatbotImage}
//                   alt="Chatbot"
//                   style={{ width: 32, height: 32, borderRadius: '50%', marginRight: '8px' }}
//                 />
//               ) : null}
//               <Typography
//                 variant="body2"
//                 sx={{ fontSize: 14, fontWeight: 'bold', whiteSpace: 'pre-line' }}
//               >
//                 {chat.isSQLResponse ? (
//                   <pre><code className="sql" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{chat.content}</code></pre>
//                 ) : (
//                   chat.role === 'assistant'
//                     ? formatApiResponse(chat.content)
//                     : chat.content
//                 )}
//               </Typography>
//               {chat.role === 'user' ? (
//                 <img
//                   src={userImage}
//                   alt="User"
//                   style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: '8px' }}
//                 />
//               ) : null}
//             </Box>

//           </Paper>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default ChatMessage;


import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import chatbot from '../images/chatbot.png';
import user from '../images/user.png';
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('sql', sql);

function formatApiResponse(response) {
  if (!response) {
      return <p>No data available</p>;
  }

  if (typeof response === 'string') {
      try {
          response = JSON.parse(response); // Attempt to parse string as JSON
      } catch (error) {
          // Not JSON, return as plain text
          return renderTextWithFormatting(response);
      }
  }

  if (Array.isArray(response)) {
      return renderTable(response);
  }

  // If it's an object, attempt to convert to an array if it's not already
  if (typeof response === 'object') {
      const arrayFromObject = Object.keys(response).map(key => ({
          property: key,
          value: response[key]
      }));
      return renderTableFromObject(arrayFromObject);
  }

  // Fallback for any other type
  return renderTextWithFormatting(String(response));
}


function renderTable(data) {
  if (!data || !data.length) {
    return <p>No data available.</p>;
  }

  // Ensure all objects have the same keys for column headers
  const headers = data.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      if (!acc.includes(key)) acc.push(key);
    });
    return acc;
  }, []);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map(header => (
              <td key={`${header}-${index}`} style={{ border: '1px solid black', padding: '8px' }}>
                {typeof row[header] === 'object' ? JSON.stringify(row[header], null, 2) : row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


function renderTableFromObject(data) {
  // First, check if data is empty or not an object
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return <p>No data available.</p>;
  }

  // Determine the headers from the keys of the first property if it's an object
  // This assumes that the object's values are either primitives or arrays/objects structured similarly
  const firstKey = Object.keys(data)[0];
  const headers = typeof data[firstKey] === 'object' ? Object.keys(data[firstKey]) : ['Value'];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Property</th>
          {headers.map(header => (
            <th key={header} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((key, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{key}</td>
            {headers.map(header => (
              <td key={header} style={{ border: '1px solid black', padding: '8px' }}>
                {renderValue(data[key], header)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Helper function to handle various types of values
function renderValue(item, prop) {
  const value = item[prop];
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }
  return value || "N/A"; // Return "N/A" if the property does not exist in the item
}



function renderTextWithFormatting(text) {
  // Ensure text is a string
  if (typeof text !== 'string') {
      text = String(text);
  }

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

