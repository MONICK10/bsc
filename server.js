import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Ensure data and upload directories exist
const dataDir = path.join(__dirname, 'server', 'data');
const uploadsDir = path.join(__dirname, 'server', 'uploads', 'upcoming-matches');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const matchesFile = path.join(dataDir, 'matches.json');

// Initialize matches.json if it doesn't exist
if (!fs.existsSync(matchesFile)) {
  fs.writeFileSync(matchesFile, JSON.stringify([], null, 2));
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  }
});

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'server', 'uploads')));

// Helper functions
const readMatches = () => {
  try {
    const data = fs.readFileSync(matchesFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading matches:', error);
    return [];
  }
};

const writeMatches = (matches) => {
  try {
    fs.writeFileSync(matchesFile, JSON.stringify(matches, null, 2));
  } catch (error) {
    console.error('Error writing matches:', error);
  }
};

const deleteFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

// Helper function to convert image paths to absolute URLs
const formatMatchesForResponse = (matches, req) => {
  const baseUrl = req ? `${req.protocol}://${req.get('host')}` : '';
  return matches.map(match => ({
    ...match,
    team1_image: match.team1_image ? `${baseUrl}${match.team1_image}` : null,
    team2_image: match.team2_image ? `${baseUrl}${match.team2_image}` : null
  }));
};

// MATCH API ENDPOINTS

// GET all matches
app.get('/api/matches', (req, res) => {
  try {
    const matches = readMatches();
    // Sort by match_date
    matches.sort((a, b) => new Date(a.match_date) - new Date(b.match_date));
    res.json(formatMatchesForResponse(matches, req));
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// POST create new match
app.post('/api/matches', upload.fields([{ name: 'team1_image' }, { name: 'team2_image' }]), (req, res) => {
  try {
    const { match_name, team1_name, team2_name, venue, match_date, match_time, sport_type, description } = req.body;

    // Validate required fields
    if (!match_name || !team1_name || !team2_name || !venue || !match_date || !match_time || !sport_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const matches = readMatches();
    const newId = matches.length > 0 ? Math.max(...matches.map(m => m.id)) + 1 : 1;

    const newMatch = {
      id: newId,
      match_name,
      team1_name,
      team2_name,
      team1_image: req.files?.team1_image?.[0] ? `/uploads/upcoming-matches/${req.files.team1_image[0].filename}` : null,
      team2_image: req.files?.team2_image?.[0] ? `/uploads/upcoming-matches/${req.files.team2_image[0].filename}` : null,
      venue,
      match_date,
      match_time,
      sport_type,
      description: description || null,
      created_at: new Date().toISOString()
    };

    matches.push(newMatch);
    writeMatches(matches);

    const formattedMatch = formatMatchesForResponse([newMatch], req)[0];
    res.status(201).json(formattedMatch);
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ error: 'Failed to create match' });
  }
});

// PUT update match
app.put('/api/matches/:id', upload.fields([{ name: 'team1_image' }, { name: 'team2_image' }]), (req, res) => {
  try {
    const { id } = req.params;
    const { match_name, team1_name, team2_name, venue, match_date, match_time, sport_type, description } = req.body;

    const matches = readMatches();
    const matchIndex = matches.findIndex(m => m.id === parseInt(id));

    if (matchIndex === -1) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const currentMatch = matches[matchIndex];

    // Handle team1 image replacement
    if (req.files?.team1_image?.[0]) {
      if (currentMatch.team1_image) {
        const oldPath = path.join(__dirname, 'server', currentMatch.team1_image);
        deleteFile(oldPath);
      }
      currentMatch.team1_image = `/uploads/upcoming-matches/${req.files.team1_image[0].filename}`;
    }

    // Handle team2 image replacement
    if (req.files?.team2_image?.[0]) {
      if (currentMatch.team2_image) {
        const oldPath = path.join(__dirname, 'server', currentMatch.team2_image);
        deleteFile(oldPath);
      }
      currentMatch.team2_image = `/uploads/upcoming-matches/${req.files.team2_image[0].filename}`;
    }

    // Update match data
    currentMatch.match_name = match_name || currentMatch.match_name;
    currentMatch.team1_name = team1_name || currentMatch.team1_name;
    currentMatch.team2_name = team2_name || currentMatch.team2_name;
    currentMatch.venue = venue || currentMatch.venue;
    currentMatch.match_date = match_date || currentMatch.match_date;
    currentMatch.match_time = match_time || currentMatch.match_time;
    currentMatch.sport_type = sport_type || currentMatch.sport_type;
    currentMatch.description = description !== undefined ? description : currentMatch.description;
    currentMatch.updated_at = new Date().toISOString();

    matches[matchIndex] = currentMatch;
    writeMatches(matches);

    const formattedMatch = formatMatchesForResponse([currentMatch], req)[0];
    res.json(formattedMatch);
  } catch (error) {
    console.error('Error updating match:', error);
    res.status(500).json({ error: 'Failed to update match' });
  }
});

// DELETE match
app.delete('/api/matches/:id', (req, res) => {
  try {
    const { id } = req.params;
    const matches = readMatches();
    const matchIndex = matches.findIndex(m => m.id === parseInt(id));

    if (matchIndex === -1) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const match = matches[matchIndex];

    // Delete associated images
    if (match.team1_image) {
      const filePath = path.join(__dirname, 'server', match.team1_image);
      deleteFile(filePath);
    }
    if (match.team2_image) {
      const filePath = path.join(__dirname, 'server', match.team2_image);
      deleteFile(filePath);
    }

    matches.splice(matchIndex, 1);
    writeMatches(matches);

    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    console.error('Error deleting match:', error);
    res.status(500).json({ error: 'Failed to delete match' });
  }
});

// ============================================
// LIVE API ENDPOINTS
// ============================================

const liveFile = path.join(dataDir, 'live.json');

// Initialize live.json if it doesn't exist
if (!fs.existsSync(liveFile)) {
  fs.writeFileSync(liveFile, JSON.stringify({
    isLive: false,
    youtubeVideoId: null,
    matchTitle: null
  }, null, 2));
}

// Helper function for live data
const readLiveData = () => {
  try {
    const data = fs.readFileSync(liveFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading live data:', error);
    return { isLive: false, youtubeVideoId: null, matchTitle: null };
  }
};

const writeLiveData = (data) => {
  try {
    fs.writeFileSync(liveFile, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing live data:', error);
    return false;
  }
};

// GET live status
app.get('/api/live', (req, res) => {
  try {
    const liveData = readLiveData();
    res.json(liveData);
  } catch (error) {
    console.error('Error fetching live data:', error);
    res.status(500).json({ error: 'Failed to fetch live data' });
  }
});

// POST - Start live stream
app.post('/api/live', (req, res) => {
  try {
    const { youtubeVideoId, matchTitle } = req.body;

    // Validate required fields
    if (!youtubeVideoId || !matchTitle) {
      return res.status(400).json({ error: 'Missing youtubeVideoId or matchTitle' });
    }

    const liveData = {
      isLive: true,
      youtubeVideoId,
      matchTitle,
      startedAt: new Date().toISOString()
    };

    if (writeLiveData(liveData)) {
      console.log('📺 Live stream started:', matchTitle);
      res.json(liveData);
    } else {
      res.status(500).json({ error: 'Failed to save live data' });
    }
  } catch (error) {
    console.error('Error starting live stream:', error);
    res.status(500).json({ error: 'Failed to start live stream' });
  }
});

// PUT - End live stream
app.put('/api/live/end', (req, res) => {
  try {
    const liveData = {
      isLive: false,
      youtubeVideoId: null,
      matchTitle: null
    };

    if (writeLiveData(liveData)) {
      console.log('⏹️ Live stream ended');
      res.json({ message: 'Live stream ended', data: liveData });
    } else {
      res.status(500).json({ error: 'Failed to end live stream' });
    }
  } catch (error) {
    console.error('Error ending live stream:', error);
    res.status(500).json({ error: 'Failed to end live stream' });
  }
});

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000
});

let liveState = {
  isLive: false,
  streamTitle: '',
  adminSocketId: null
};

console.log('Socket.IO server initializing...');

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id, 'Transport:', socket.conn.transport.name);

  socket.conn.on('upgrade', () => {
    console.log('🔄 Transport upgraded to:', socket.conn.transport.name);
  });

  socket.on('admin:join', () => {
    console.log('👨‍💼 Admin joined:', socket.id);
    liveState.adminSocketId = socket.id;
    socket.emit('live:state', liveState);
  });

  socket.on('viewer:join', () => {
    console.log('👀 Viewer joined:', socket.id);
    socket.emit('live:state', liveState);
    
    if (liveState.isLive && liveState.adminSocketId) {
      console.log('📺 Notifying admin about viewer:', socket.id);
      socket.to(liveState.adminSocketId).emit('viewer:request-stream', socket.id);
    }
  });

  socket.on('stream:start', (data) => {
    console.log('🎥 Stream started:', data);
    liveState.isLive = true;
    liveState.streamTitle = data.title;
    liveState.adminSocketId = socket.id;
    io.emit('live:state', liveState);
  });

  socket.on('stream:stop', () => {
    console.log('⏹️ Stream stopped');
    liveState.isLive = false;
    liveState.streamTitle = '';
    liveState.adminSocketId = null;
    io.emit('live:state', liveState);
  });

  socket.on('offer', (data) => {
    console.log('📤 Offer sent to:', data.to);
    socket.to(data.to).emit('offer', {
      offer: data.offer,
      from: socket.id
    });
  });

  socket.on('answer', (data) => {
    console.log('📥 Answer sent to:', data.to);
    socket.to(data.to).emit('answer', {
      answer: data.answer,
      from: socket.id
    });
  });

  socket.on('ice-candidate', (data) => {
    console.log('🧊 ICE candidate sent to:', data.to);
    socket.to(data.to).emit('ice-candidate', {
      candidate: data.candidate,
      from: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
    if (socket.id === liveState.adminSocketId) {
      console.log('⚠️ Admin disconnected, stopping stream');
      liveState.isLive = false;
      liveState.streamTitle = '';
      liveState.adminSocketId = null;
      io.emit('live:state', liveState);
    }
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

io.engine.on('connection_error', (err) => {
  console.error('Connection error:', err);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    socketio: 'running',
    liveState,
    matchesFile: matchesFile,
    uploadsDir: uploadsDir
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
const HOST = '0.0.0.0';

httpServer.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on ${HOST}:${PORT}`);
  console.log(`📡 Socket.IO ready for connections`);
  console.log(`📂 Matches data: ${matchesFile}`);
  console.log(`📸 Uploads folder: ${uploadsDir}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
c o n s t   c h a t U s e r s   =   n e w   M a p ( ) ;      
 c o n s t   c h a t M e s s a g e s   =   [ ] ;      
 c o n s t   M A X _ M E S S A G E S   =   1 0 0 ;    
 