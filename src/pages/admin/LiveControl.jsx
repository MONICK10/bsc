import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLiveStore } from '../../store/index.js';
import { webrtcService } from '../../services/webrtc.js';

export default function LiveControl() {
  const { isLive, streamTitle, setIsLive, setStreamTitle } = useLiveStore();
  const videoRef = useRef(null);
  const [cameraConnected, setCameraConnected] = useState(false);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputTitle, setInputTitle] = useState(streamTitle);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      webrtcService.stopBroadcast();
      webrtcService.disconnect();
    };
  }, [stream]);

  const handleConnectCamera = async () => {
    setLoading(true);
    try {
      console.log('Requesting camera access...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true,
      });
      
      console.log('Stream obtained:', mediaStream);
      console.log('Video tracks:', mediaStream.getVideoTracks());
      console.log('Audio tracks:', mediaStream.getAudioTracks());
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        console.log('Attaching stream to video element');
        videoRef.current.srcObject = mediaStream;
        
        try {
          await videoRef.current.play();
          console.log('Video playback started');
        } catch (playError) {
          console.error('Video play error:', playError);
        }
      } else {
        console.error('videoRef.current is null');
      }
      
      setCameraConnected(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera/Microphone access denied. Please allow permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnectCamera = () => {
    if (isLive) {
      handleStopLive();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraConnected(false);
  };

  const handleStartLive = async () => {
    if (!stream) {
      alert('Please connect camera first');
      return;
    }
    setLoading(true);
    try {
      const title = inputTitle || 'Live Match';
      await webrtcService.startBroadcast(stream, title);
      setIsLive(true);
      setStreamTitle(title);
    } catch (error) {
      console.error('Error starting stream:', error);
      alert('Failed to start live stream');
    } finally {
      setLoading(false);
    }
  };

  const handleStopLive = async () => {
    setLoading(true);
    try {
      webrtcService.stopBroadcast();
      setIsLive(false);
      setStreamTitle('');
    } catch (error) {
      console.error('Error stopping stream:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy-blue mb-8">Live Stream Control</h1>
      </div>

      {/* Live Status */}
      <motion.div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-navy-blue">Stream Status</h2>
          <motion.div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold ${
              isLive
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600'
            }`}
            animate={isLive ? { opacity: [1, 0.5, 1] } : {}}
            transition={isLive ? { duration: 1, repeat: Infinity } : {}}
          >
            <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-600' : 'bg-gray-400'}`}></span>
            <span>{isLive ? 'LIVE' : 'OFFLINE'}</span>
          </motion.div>
        </div>

        {isLive && (
          <div className="bg-blue-50 border border-sky-blue rounded p-4">
            <p className="text-navy-blue font-semibold">Current Stream: {streamTitle}</p>
          </div>
        )}
      </motion.div>

      {/* Camera Preview */}
      <motion.div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-navy-blue mb-4">Camera Preview</h2>
        
        <div className="mb-6 relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover ${!cameraConnected ? 'hidden' : ''}`}
          />
          {!cameraConnected && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="text-6xl mb-4">📹</div>
              <p>Camera not connected</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleConnectCamera}
            disabled={cameraConnected || loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white smooth-transition ${
              cameraConnected || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading ? 'Connecting...' : 'Connect Camera'}
          </button>
          <button
            onClick={handleDisconnectCamera}
            disabled={!cameraConnected}
            className={`px-6 py-3 rounded-lg font-semibold text-white smooth-transition ${
              !cameraConnected
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Disconnect Camera
          </button>
        </div>
      </motion.div>

      {/* Stream Control */}
      <motion.div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-navy-blue mb-6">Stream Settings</h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Stream Title</label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Enter stream title (e.g., Football vs City United)"
            disabled={isLive}
            className="w-full border border-gray-300 rounded-lg p-3 disabled:bg-gray-100"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleStartLive}
            disabled={!cameraConnected || isLive || loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white smooth-transition ${
              !cameraConnected || isLive || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading ? 'Starting...' : '▶️ Start Live'}
          </button>
          <button
            onClick={handleStopLive}
            disabled={!isLive || loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white smooth-transition ${
              !isLive || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {loading ? 'Stopping...' : '⏹️ Stop Live'}
          </button>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div className="bg-blue-50 border border-sky-blue rounded-lg p-6">
        <h3 className="font-bold text-navy-blue mb-3">📋 Instructions</h3>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>✓ Click "Connect Camera" to request camera/microphone permissions</li>
          <li>✓ Preview your stream in real-time</li>
          <li>✓ Enter a stream title before going live</li>
          <li>✓ Click "Start Live" to begin broadcasting</li>
          <li>✓ Viewers can watch on the Live page</li>
          <li>✓ Click "Stop Live" when done</li>
        </ul>
      </motion.div>
    </div>
  );
}
