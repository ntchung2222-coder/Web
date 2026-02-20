import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    // In development, the socket server runs on the same port as the dev server
    socket = io(window.location.origin);
  }
  return socket;
};

export const joinMatch = (matchId: string) => {
  const s = getSocket();
  s.emit("join-match", matchId);
};

export const updateScore = (data: any) => {
  const s = getSocket();
  s.emit("score-update", data);
};

export const onScoreUpdated = (callback: (data: any) => void) => {
  const s = getSocket();
  s.on("score-updated", callback);
  return () => s.off("score-updated", callback);
};
