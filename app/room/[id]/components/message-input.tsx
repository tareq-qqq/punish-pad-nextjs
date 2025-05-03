import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MessageInput = ({ roomId }: { roomId: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    inputRef.current?.focus();
    const value = inputRef.current?.value;
    if (value?.trim() === "" || !value) {
      return;
    }
    socket.emit("punishment-message", roomId, inputRef.current?.value);
    setText("");
  };

  useEffect(() => {
    const input = inputRef.current;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };
    input?.addEventListener("keydown", onKeyDown);
    return () => {
      input?.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="flex gap-2 px-2">
      <Input
        autoFocus
        ref={inputRef}
        type="text"
        value={text}
        placeholder="Hurry up!!!"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button type="button" onClick={handleSubmit}>
        <span className="hidden md:block">Send</span>
        <span className="block">
          <Send />
        </span>
      </Button>
    </div>
  );
};
export default MessageInput;
