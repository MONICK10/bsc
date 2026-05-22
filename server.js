import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let liveState = {
  isLive: false,
  streamTitle: '',
  adminSocketId: null
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('admin:join', () => {
    console.log('Admin joined:', socket.id);
    liveState.adminSocketId = socket.id;
    socket.emit('live:state', liveState);
  });

  socket.on('viewer:join', () => {
    console.log('Viewer joined:', socket.id);
    socket.emit('live:state', liveState);
    
    if (liveState.isLive && liveState.adminSocketId) {
      socket.to(liveState.adminSocketId).emit('viewer:request-stream', socket.id);
    }
  });

  socket.on('stream:start', (data) => {
    console.log('Stream started:', data);
    liveState.isLive = true;
    liveState.streamTitle = data.title;
    liveState.adminSocketId = socket.id;
    io.emit('live:state', liveState);
  });

  socket.on('stream:stop', () => {
    console.log('Stream stopped');
    liveState.isLive = false;
    liveState.streamTitle = '';
    liveState.adminSocketId = null;
    io.emit('live:state', liveState);
  });

  socket.on('offer', (data) => {
    console.log('Offer sent to:', data.to);
    socket.to(data.to).emit('offer', {
      offer: data.offer,
      from: socket.id
    });
  });

  socket.on('answer', (data) => {
    console.log('Answer sent to:', data.to);
    socket.to(data.to).emit('answer', {
      answer: data.answer,
      from: socket.id
    });
  });

  socket.on('ice-candidate', (data) => {
    console.log('ICE candidate sent to:', data.to);
    socket.to(data.to).emit('ice-candidate', {
      candidate: data.candidate,
      from: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (socket.id === liveState.adminSocketId) {
      liveState.isLive = false;
      liveState.streamTitle = '';
      liveState.adminSocketId = null;
      io.emit('live:state', liveState);
    }
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
