"use client";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { useParams } from "next/navigation";
import { Room } from "@/lib/types";
import { Input } from "@/components/ui/input";
const Page = () => {
  const params = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPhrase, setCurrentPhrase] = useState<string>("");

  useEffect(() => {
    socket.emit(
      "joinRoom",
      params.id,
      ({ room, error }: { room?: Room; error?: string }) => {
        if (error) {
          setError(error);
          console.error(error);
          return;
        }
        if (room) {
          setRoom(room);
        }
      },
    );
  }, [params.id]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{JSON.stringify(room, null, 2)}</div>;
      <Input
        type="text"
        value={currentPhrase}
        onChange={(e) => {
          setCurrentPhrase(e.target.value);
          socket.emit("typing", params.id, e.target.value);
        }}
      />
    </div>
  );
};
export default Page;
