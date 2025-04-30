"use client";
import socket from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
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
  return (
    <div>
      <p>Waiting for the other person to join the room...</p>
      <p>http://localhost:3000/p/room/{params.id}</p>
    </div>
  );
};
export default Page;
