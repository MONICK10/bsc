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
  }

  connect() {
    if (this.socket?.connected) return this.socket;
    
    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return this.socket;
  }

  disconnect() {
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  async startBroadcast(stream, title) {
    this.localStream = stream;
    this.isAdmin = true;
    this.connect();

    this.socket.emit('admin:join');
    this.socket.emit('stream:start', { title });

    this.socket.on('viewer:request-stream', async (viewerId) => {
      await this.createPeerConnection(viewerId, true);
    });
  }

  stopBroadcast() {
    if (this.socket) {
      this.socket.emit('stream:stop');
    }
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    this.localStream = null;
    this.isAdmin = false;
  }

  async joinAsViewer(onStreamReceived) {
    this.isAdmin = false;
    this.connect();

    this.socket.emit('viewer:join');

    this.socket.on('offer', async ({ offer, from }) => {
      await this.handleOffer(offer, from, onStreamReceived);
    });

    this.socket.on('ice-candidate', ({ candidate, from }) => {
      this.handleIceCandidate(candidate, from);
    });
  }

  async createPeerConnection(peerId, isInitiator) {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peerConnections.set(peerId, pc);

    if (this.localStream && this.isAdmin) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream);
      });
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('ice-candidate', {
          candidate: event.candidate,
          to: peerId
        });
      }
    };

    if (isInitiator) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      this.socket.emit('offer', { offer, to: peerId });

      this.socket.on('answer', async ({ answer, from }) => {
        if (from === peerId) {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });
    }

    return pc;
  }

  async handleOffer(offer, from, onStreamReceived) {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peerConnections.set(from, pc);

    pc.ontrack = (event) => {
      console.log('Received remote stream');
      if (onStreamReceived) {
        onStreamReceived(event.streams[0]);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('ice-candidate', {
          candidate: event.candidate,
          to: from
        });
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    this.socket.emit('answer', { answer, to: from });
  }

  handleIceCandidate(candidate, from) {
    const pc = this.peerConnections.get(from);
    if (pc) {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  onLiveStateChange(callback) {
    if (this.socket) {
      this.socket.on('live:state', callback);
    }
  }
}

export const webrtcService = new WebRTCService();
