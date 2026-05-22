import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

export default function LiveChat({ isLive }) {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [onlineCount, setOnlineCount] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('chat_username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    if (!isLive) return;

    const socketUrl = window.location.origin;
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Chat connected');
    });

    newSocket.on('chat-history', (history) => {
      setMessages(history);
    });

    newSocket.on('chat-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('user-joined', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        message: `${data.username} joined the chat`,
        timestamp: data.timestamp
      }]);
    });

    newSocket.on('user-left', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        message: `${data.username} left the chat`,
        timestamp: data.timestamp
      }]);
    });

    newSocket.on('online-count', (count) => {
      setOnlineCount(count);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isLive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoinChat = () => {
    if (!username.trim()) return;
    localStorage.setItem('chat_username', username);
    socket.emit('join-chat', username);
    setHasJoined(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socket) return;

    socket.emit('send-message', { message: inputMessage });
    setInputMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isLive) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-center">
        <p className="text-slate-400">Chat available during live streams</p>
      </div>
    );
  }

  if (!hasJoined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-lg p-6"
      >
        <h3 className="text-white text-xl font-bold mb-4">Join Live Chat</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleJoinChat()}
          placeholder="Enter your username"
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
          maxLength={20}
        />
        <button
          onClick={handleJoinChat}
          disabled={!username.trim()}
          className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Join Chat
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg overflow-hidden flex flex-col h-[600px]"
    >
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white font-bold">Live Chat</span>
        </div>
        <span className="text-slate-400 text-sm">{onlineCount} online</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={msg.type === 'system' ? 'text-center' : ''}
            >
              {msg.type === 'system' ? (
                <p className="text-slate-500 text-xs italic">{msg.message}</p>
              ) : (
                <div className="bg-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sky-400 font-semibold text-sm">{msg.username}</span>
                    <span className="text-slate-500 text-xs">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-white text-sm break-words">{msg.message}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-slate-900">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
}
