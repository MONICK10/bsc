import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { checkOnlineStatus, addOnlineListener, addOfflineListener, removeOnlineListener, removeOfflineListener } from '../utils/pwa';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(checkOnlineStatus());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    addOnlineListener(handleOnline);
    addOfflineListener(handleOffline);

    return () => {
      removeOnlineListener(handleOnline);
      removeOfflineListener(handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-3 px-4 text-center shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">📡</span>
            <span className="font-semibold">You are offline</span>
            <span className="hidden sm:inline">- Some features may be unavailable</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
