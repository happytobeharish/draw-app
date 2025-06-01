"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { WS_URL } from "../config";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZTIyODA4Ny1mNDIyLTQ4MTQtODJjYS05ZWQ0MjU1M2QzNmIiLCJpYXQiOjE3NDg3MDAxNDJ9.OGOImwc5EgSC_WnLuDDiuuDCLXkvKW7hL4RXMKSoofY`
    );

    ws.onopen = () => {
      setSocket(ws);
      const joinMessage = JSON.stringify({
        type: "join_room",
        roomId,
      });
      console.log("[WebSocket Join]:", joinMessage);
      ws.send(joinMessage);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.warn("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [roomId]); // ✅ include roomId as dependency

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
