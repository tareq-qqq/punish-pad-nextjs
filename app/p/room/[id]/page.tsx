"use client";
import Messages from "@/components/messages";
import Progress from "@/components/progress";
import { useRoom } from "@/providers/room-provider";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import PhraseInput from "./components/phrase-input";
import Clients from "@/components/clients";
import Goal from "@/components/goal";

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

  if (error) {
    return <div>{error}</div>;
  }
  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <div>{JSON.stringify(room, null, 2)}</div>;<div></div> */}
      <Clients ownerName={room.ownerName} partnerName={room.partnerName} />
      <Goal phrase={room.phrase} repetitions={room.repetition} />
      <Progress initialHits={room.hits} initialMisses={room.misses} />
      <Messages />
      <PhraseInput roomId={params.id} currentPhrase={room.currentPhrase} />
    </div>
  );
};
export default Page;
