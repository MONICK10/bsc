import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

class WebRTCService {
  constructor() {
    this.socket = null;
    this.peerConnections = new Map();
    this.localStream = null;
    this.isAdmin = false;
    this.onStreamCallback = null;
  }

  connect() {
    if (this.socket?.connected) return this.socket;
    
    console.log('Connecting to socket server:', SOCKET_URL);
    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    console.log('Disconnecting WebRTC service');
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  async startBroadcast(stream, title) {
    console.log('🎥 Starting broadcast:', title);
    this.localStream = stream;
    this.isAdmin = true;
    this.connect();

    console.log('Emitting admin:join');
    this.socket.emit('admin:join');
    
    console.log('Emitting stream:start');
    this.socket.emit('stream:start', { title });

    this.socket.off('viewer:request-stream');
    this.socket.on('viewer:request-stream', async (viewerId) => {
      console.log('📺 Viewer requesting stream:', viewerId);
      await this.createOfferForViewer(viewerId);
    });

    this.socket.off('answer');
    this.socket.on('answer', async ({ answer, from }) => {
      console.log('📩 Received answer from viewer:', from);
      const pc = this.peerConnections.get(from);
      if (pc) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
          console.log('✅ Remote description set for viewer:', from);
        } catch (error) {
          console.error('Error setting remote description:', error);
        }
      }
    });

    this.socket.off('ice-candidate');
    this.socket.on('ice-candidate', async ({ candidate, from }) => {
      console.log('🧊 Received ICE candidate from:', from);
      const pc = this.peerConnections.get(from);
      if (pc && candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('✅ ICE candidate added');
        } catch (error) {
          console.error('Error adding ICE candidate:', error);
        }
      }
    });
  }

  async createOfferForViewer(viewerId) {
    console.log('Creating peer connection for viewer:', viewerId);
    
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peerConnections.set(viewerId, pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('🧊 Sending ICE candidate to viewer:', viewerId);
        this.socket.emit('ice-candidate', {
          candidate: event.candidate,
          to: viewerId
        });
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
    };

    if (this.localStream) {
      console.log('Adding tracks to peer connection');
      this.localStream.getTracks().forEach(track => {
        console.log('Adding track:', track.kind, track.label);
        pc.addTrack(track, this.localStream);
      });
    } else {
      console.error('❌ No local stream available');
      return;
    }

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log('📤 Sending offer to viewer:', viewerId);
      this.socket.emit('offer', { offer, to: viewerId });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }

  stopBroadcast() {
    console.log('⏹️ Stopping broadcast');
    if (this.socket) {
      this.socket.emit('stream:stop');
    }
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    this.localStream = null;
    this.isAdmin = false;
  }

  async joinAsViewer(onStreamReceived) {
    console.log('👀 Joining as viewer');
    this.isAdmin = false;
    this.onStreamCallback = onStreamReceived;
    this.connect();

    console.log('Emitting viewer:join');
    this.socket.emit('viewer:join');

    this.socket.off('offer');
    this.socket.on('offer', async ({ offer, from }) => {
      console.log('📩 Received offer from broadcaster:', from);
      await this.handleOffer(offer, from);
    });

    this.socket.off('ice-candidate');
    this.socket.on('ice-candidate', async ({ candidate, from }) => {
      console.log('🧊 Received ICE candidate from broadcaster:', from);
      await this.handleIceCandidate(candidate, from);
    });
  }

  async handleOffer(offer, from) {
    console.log('Creating peer connection for broadcaster:', from);
    
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peerConnections.set(from, pc);

    pc.ontrack = (event) => {
      console.log('🎉 RECEIVED REMOTE TRACK:', event.track.kind);
      console.log('Remote streams:', event.streams);
      if (event.streams && event.streams[0]) {
        console.log('✅ Calling onStreamCallback with remote stream');
        if (this.onStreamCallback) {
          this.onStreamCallback(event.streams[0]);
        }
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('🧊 Sending ICE candidate to broadcaster:', from);
        this.socket.emit('ice-candidate', {
          candidate: event.candidate,
          to: from
        });
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
    };

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      console.log('✅ Remote description set');
      
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      console.log('📤 Sending answer to broadcaster:', from);
      
      this.socket.emit('answer', { answer, to: from });
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  async handleIceCandidate(candidate, from) {
    const pc = this.peerConnections.get(from);
    if (pc && candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('✅ ICE candidate added');
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  }

  onLiveStateChange(callback) {
    if (this.socket) {
      this.socket.on('live:state', (state) => {
        console.log('📡 Live state changed:', state);
        callback(state);
      });
    }
  }
}

export const webrtcService = new WebRTCService();
