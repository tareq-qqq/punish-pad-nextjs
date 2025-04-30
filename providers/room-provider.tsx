import { Room } from "@/lib/types";
import { createContext, useState } from "react";

const RoomContext = createContext<{
  room: Room | null;
  setRoom: (room: Room) => void;
} | null>(null);

const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room | null>(null);
  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
