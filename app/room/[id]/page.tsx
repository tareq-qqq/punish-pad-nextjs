"use client";

import Clients from "@/components/clients";
import Goal from "@/components/goal";
import Messages from "@/components/messages";
import Progress from "@/components/progress";
import socket from "@/lib/socket";
import { useRoom } from "@/providers/room-provider";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const params = useParams<{ id: string }>();
  const {
    state: { room, setRoom },
    errorState: { error },
  } = useRoom(params.id);

  useEffect(() => {
    socket.on("typing", (text: string) => {
      setRoom((room) => {
        if (!room) return null;
        return { ...room, currentPhrase: text };
      });
    });
  }, [setRoom]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Goal phrase={room.phrase} />
      <Clients ownerName={room.ownerName} partnerName={room.partnerName} />
      <Progress initialHits={room.hits} initialMisses={room.misses} />
      <Messages />
    </div>
  );
};
export default Page;
