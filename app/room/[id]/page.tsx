"use client";

import socket from "@/lib/socket";
import { useRoom } from "@/providers/room-provider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useParams<{ id: string }>();
  const {
    state: { room },
    errorState: { error },
  } = useRoom(params.id);

  const [text, setText] = useState(room?.currentPhrase);

  useEffect(() => {
    if (room) {
      setText(room.currentPhrase);
    }
  }, [room]);

  useEffect(() => {
    socket.on("typing", (text: string) => {
      setText(text);
    });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{JSON.stringify(room, null, 2)}</p>
      <div>{text}</div>
    </div>
  );
};
export default Page;
