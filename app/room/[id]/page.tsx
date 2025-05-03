"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";

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
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-950">
          <p className="text-lg font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground text-lg font-medium">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-dvh px-4">
      <main className="bg-background h-dvh pt-4">
        <div className="container mx-auto grid h-full max-w-2xl grid-rows-[auto_1fr_auto]">
          <div>
            <Goal
              phrase={room.phrase}
              repetitions={room.repetition}
              owner={room.ownerName}
              punished={room.partnerName}
            />
            <Progress
              initialHits={room.hits}
              initialMisses={room.misses}
              total={room.repetition}
            />
          </div>
          <Messages />
          <MessageInput roomId={params.id} />
          <div className="my-4">
            {room?.status === "finished" && (
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your partner has finished their punishment.{" "}
                  <Link
                    className="font-medium underline hover:text-green-800 dark:hover:text-green-200"
                    href={"/create-room"}
                  >
                    Create a new room
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </ScrollArea>
  );
};

export default Page;
