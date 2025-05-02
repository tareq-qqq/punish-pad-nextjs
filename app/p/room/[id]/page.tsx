"use client";
import Messages from "@/components/messages";
import Progress from "@/components/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { useRoom } from "@/providers/room-provider";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const Page = () => {
  const params = useParams<{ id: string }>();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    state: { room, setRoom },
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (value?.trim() === "" || !value) {
      return;
    }
    socket.emit("submit-phrase", params.id, inputRef.current?.value);
    socket.emit("typing", params.id, "");
    setRoom((room) => {
      if (!room) return null;
      return { ...room, currentPhrase: "" };
    });
    // inputRef.current!.value = "";
    inputRef.current!.focus();
  };

  return (
    <div>
      {/* <div>{JSON.stringify(room, null, 2)}</div>;<div></div> */}
      <Progress />
      <Messages />
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          autoFocus
          ref={inputRef}
          type="text"
          value={room.currentPhrase}
          onChange={(e) => {
            setRoom({ ...room, currentPhrase: e.target.value });
            socket.emit("typing", params.id, e.target.value);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default Page;
