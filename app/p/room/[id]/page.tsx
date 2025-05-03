"use client";
import Goal from "@/components/goal";
import Messages from "@/components/messages";
import Progress from "@/components/progress";
import socket from "@/lib/socket";
import { useRoom } from "@/providers/room-provider";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import PhraseInput from "./components/phrase-input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
  const params = useParams<{ id: string }>();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    state: { room },
    errorState: { error },
  } = useRoom(params.id);

  useEffect(() => {
    const input = inputRef.current;
    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    input?.addEventListener("paste", onPaste);

    return () => {
      input?.removeEventListener("paste", onPaste);
    };
  });

  useEffect(() => {
    socket.on("punishment-message", (roomId: string, message: string) => {
      console.log(message);
      toast.message(message);
    });
  }, []);

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

          {room?.status === "finished" ? (
            <div className="rounded-lg bg-green-50 p-3 pb-4 text-center dark:bg-green-950">
              <p className="text-sm text-green-700 dark:text-green-300">
                You&apos;re done! Wait for your owner to create a new room.
              </p>
            </div>
          ) : (
            <PhraseInput
              roomId={params.id}
              currentPhrase={room.currentPhrase}
              roomStatus={room.status}
            />
          )}
        </div>
      </main>
    </ScrollArea>
  );
};

export default Page;
