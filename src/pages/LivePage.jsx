import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLiveStore } from '../store/index.js';
import LiveBadge from '../components/LiveBadge.jsx';
import { webrtcService } from '../services/webrtc.js';

export default function LivePage() {
  const { isLive, streamTitle, setIsLive, setStreamTitle } = useLiveStore();
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [streamConnected, setStreamConnected] = useState(false);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    console.log('LivePage mounted');
    webrtcService.connect();

    webrtcService.onLiveStateChange((state) => {
      console.log('Live state received:', state);
      setIsLive(state.isLive);
      setStreamTitle(state.streamTitle);
      setLoading(false);

      if (state.isLive && !hasJoinedRef.current) {
        console.log('Stream is live, joining as viewer');
        hasJoinedRef.current = true;
        connectToStream();
      } else if (!state.isLive) {
        console.log('Stream is offline');
        hasJoinedRef.current = false;
        setStreamConnected(false);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    });

    const connectToStream = async () => {
      console.log('Connecting to stream...');
      try {
        await webrtcService.joinAsViewer((stream) => {
          console.log('✅ Stream received in LivePage:', stream);
          console.log('Video tracks:', stream.getVideoTracks());
          console.log('Audio tracks:', stream.getAudioTracks());
          
          if (videoRef.current) {
            console.log('Attaching stream to video element');
            videoRef.current.srcObject = stream;
            
            videoRef.current.onloadedmetadata = () => {
              console.log('Video metadata loaded');
              videoRef.current.play().then(() => {
                console.log('✅ Video playback started');
                setStreamConnected(true);
              }).catch(err => {
                console.error('Video play error:', err);
              });
            };
          } else {
            console.error('videoRef.current is null');
          }
        });
      } catch (error) {
        console.error('Error connecting to stream:', error);
      }
    };

    return () => {
      console.log('LivePage unmounting');
      hasJoinedRef.current = false;
      webrtcService.disconnect();
    };
  }, [setIsLive, setStreamTitle]);

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <section className="bg-gradient-to-r from-sky-blue to-navy-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Live Broadcast</h1>
              <p className="text-blue-100">Watch our matches live</p>
            </div>
            <LiveBadge isLive={isLive} />
          </div>
        </div>
      </section>

      {/* Live Stream Container */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
          >
            {isLive ? (
              <div className="space-y-6">
                {/* Stream Window */}
                <div className="aspect-video bg-black relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    controls
                    className={`w-full h-full object-cover ${!streamConnected ? 'hidden' : ''}`}
                  />
                  {!streamConnected && (
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="text-6xl mb-4">📹</div>
                      <p className="text-white text-xl">Connecting to stream...</p>
                      <p className="text-gray-400 mt-2">{streamTitle || 'Live Match'}</p>
                    </div>
                  )}
                  
                  {/* Live Badge Overlay */}
                  <motion.div
                    className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold flex items-center space-x-2"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    <span>LIVE</span>
                  </motion.div>
                </div>

                {/* Stream Info */}
                <div className="p-6 border-t">
                  <h2 className="text-2xl font-bold text-navy-blue mb-2">{streamTitle || 'Live Match'}</h2>
                  <p className="text-gray-600">Tune in to watch the action unfold live!</p>
                </div>

                {/* Chat/Controls */}
                <div className="p-6 bg-gray-50 border-t">
                  <p className="text-center text-gray-500">
                    💬 Live chat and interactions coming soon
                  </p>
                </div>
              </div>
            ) : loading ? (
              <div className="min-h-96 flex flex-col items-center justify-center p-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="text-6xl mb-4"
                >
                  ⏳
                </motion.div>
                <h2 className="text-2xl font-bold text-navy-blue mb-2">Loading...</h2>
                <p className="text-gray-600">Checking live status</p>
              </div>
            ) : (
              <div className="min-h-96 flex flex-col items-center justify-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  📺
                </motion.div>
                <h2 className="text-3xl font-bold text-navy-blue mb-2">No Live Match Currently</h2>
                <p className="text-gray-600 text-center max-w-md mb-6">
                  Check back soon for upcoming live broadcasts. Visit our matches page to see scheduled games.
                </p>
                <motion.div
                  className="text-sm text-gray-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Waiting for the next broadcast...
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold text-navy-blue mb-2">Schedule</h3>
              <p className="text-gray-600 text-sm">
                Check the matches page to find when the next game will be broadcast live.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">🎥</div>
              <h3 className="font-bold text-navy-blue mb-2">HD Quality</h3>
              <p className="text-gray-600 text-sm">
                Enjoy crystal-clear HD streaming of all our matches.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold text-navy-blue mb-2">Accessible Anywhere</h3>
              <p className="text-gray-600 text-sm">
                Watch live matches from any device, anywhere in the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
