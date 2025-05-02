"use client";
import { useRoom } from "@/providers/room-provider";
import socket from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// check later if the room is not available to show an error
const Page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;
  const {
    errorState: { error },
  } = useRoom(id);

  useEffect(() => {
    console.log("mounted");
    socket.on("joined-room", (room: string, socketId: string) => {
      console.log(room, socketId);
      if (room === id) {
        console.log("user joined room", room, socketId);
        router.push(`/room/${id}`);
      }
    });
  }, [id, router]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <p>Waiting for the other person to join the room...</p>
      <p>http://localhost:3000/p/room/{params.id}</p>
    </div>
  );
};
export default Page;
