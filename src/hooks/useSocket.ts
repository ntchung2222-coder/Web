import { useEffect, useState } from 'react';

// Mock socket implementation for demonstration
export function useSocket(url?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    console.log(`Connecting to socket at ${url || 'default'}...`);
    setIsConnected(true);

    const timer = setInterval(() => {
      // Simulate incoming score updates
      const mockUpdate = {
        type: 'SCORE_UPDATE',
        tableId: Math.floor(Math.random() * 4) + 1,
        score1: Math.floor(Math.random() * 40),
        score2: Math.floor(Math.random() * 40),
      };
      setLastMessage(mockUpdate);
    }, 10000);

    return () => {
      console.log('Disconnecting socket...');
      clearInterval(timer);
      setIsConnected(false);
    };
  }, [url]);

  const sendMessage = (message: any) => {
    console.log('Sending message via socket:', message);
  };

  return { isConnected, lastMessage, sendMessage };
}
