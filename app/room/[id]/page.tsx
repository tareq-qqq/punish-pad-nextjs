"use client";

import Clients from "@/components/clients";
import Goal from "@/components/goal";
import Messages from "@/components/messages";
import Progress from "@/components/progress";
import socket from "@/lib/socket";
import { useRoom } from "@/providers/room-provider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import MessageInput from "./components/message-input";

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

  useEffect(() => {
    if (room?.status === "finished") {
      toast.success(`${room.partnerName} has finished the punishment`);
    }
  }, [room?.partnerName, room?.status]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Goal phrase={room.phrase} repetitions={room.repetition} />
      <Clients ownerName={room.ownerName} partnerName={room.partnerName} />
      <Progress initialHits={room.hits} initialMisses={room.misses} />
      <Messages />
      <MessageInput roomId={params.id} />
      {room?.status === "finished" && (
        <p>
          Your partner has finished their punishment.{" "}
          <Link className="underline" href={"/create-room"}>
            Create a new room.
          </Link>
        </p>
      )}
    </div>
  );
};
export default Page;
