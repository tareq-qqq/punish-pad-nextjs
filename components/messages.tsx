"use client";

import socket from "@/lib/socket";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRoom } from "@/providers/room-provider";
import { format } from "date-fns";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const Messages = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const pathname = usePathname();
  const {
    state: { room, setRoom },
  } = useRoom(roomId);
  const [showCursor, setShowCursor] = useState(true);
  const phraseRef = useRef(room?.currentPhrase);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("message-added", (messages: Message[]) => {
      setRoom((room) => {
        if (!room) return null;
        return { ...room, messages };
      });
    });
  }, [room, setRoom]);

  useEffect(() => {
    console.log("scrolling to bottom");
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current?.scrollHeight,
    });
    console.log(room?.status);
  }, [room]);

  // Debounce cursor display based on currentPhrase stability
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Only show cursor if currentPhrase has remained the same during the timeout
      if (phraseRef.current === room?.currentPhrase) {
        setShowCursor(true);
      }
    }, 300);

    // Keep reference updated to the latest value
    phraseRef.current = room?.currentPhrase;
    setShowCursor(false); // hide cursor immediately when phrase changes

    console.log("'" + room?.currentPhrase + "'");

    return () => clearTimeout(timeout);
  }, [room?.currentPhrase]);

  return (
    <>
      <ScrollArea
        id="scrollarea"
        className="my-4 min-h-[8rem] w-full scroll-smooth rounded-md border px-2"
        ref={scrollAreaRef}
        viewPortStyles="py-2 "
        type="always"
      >
        {room?.messages.length === 0 && (
          <p className="text-muted-foreground text-center">
            {room.partnerName}&apos;s messages will appear here.
          </p>
        )}
        {room?.messages.map((message) => (
          <div key={message.id} className="grid grid-cols-[1fr_auto] gap-2">
            <p
              className={cn(
                "max-w-[70ch] break-all whitespace-pre-wrap",
                message.correct ? "text-green-600" : "text-red-600",
              )}
            >
              {message.content}
            </p>
            <p className="text-sm">{format(message.createdAt, "hh:mm a")}</p>
          </div>
        ))}
        {pathname === `/room/${roomId}` && room?.status !== "finished" && (
          <p className="max-w-[70ch]">
            <span className="break-all whitespace-pre-wrap">
              {room?.currentPhrase}
            </span>
            <span
              className={`relative border-r-2 border-zinc-700 bg-zinc-700 ${
                showCursor ? "animate-cursor" : ""
              }`}
            ></span>
          </p>
        )}
      </ScrollArea>
    </>
  );
};
export default Messages;
