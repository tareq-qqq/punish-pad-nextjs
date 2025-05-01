"use client";
import { Room } from "@/lib/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import socket from "@/lib/socket";
import { Socket } from "socket.io-client";
interface RoomContext {
  state: {
    room: Room | null;
    setRoom: Dispatch<SetStateAction<Room | null>>;
  };
  errorState: {
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
  };
}

const RoomContext = createContext<RoomContext | null>(null);

export const useRoom = (roomId?: string) => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }

  useEffect(() => {
    if (roomId && context.state.room === null) {
      socket.emit(
        "join-room",
        roomId,
        ({ room, error }: { room?: Room; error?: string }) => {
          if (error) {
            context.errorState.setError(error);
          } else if (room) {
            context.state.setRoom(room);
            context.errorState.setError(null);
          }
        },
      );
    }
  }, [context, roomId]);

  return context;
};

const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
      setRoom(null);
      setError("Disconnected from room");
    });
  }, []);

  return (
    <RoomContext.Provider
      value={{ state: { room, setRoom }, errorState: { error, setError } }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
