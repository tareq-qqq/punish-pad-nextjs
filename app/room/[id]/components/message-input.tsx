import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { Send } from "lucide-react";
import { useRef, useState } from "react";

const MessageInput = ({ roomId }: { roomId: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (value?.trim() === "" || !value) {
      return;
    }
    socket.emit("punishment-message", roomId, inputRef.current?.value);
    setText("");
    // inputRef.current!.value = "";
  };
  return (
    <form className="flex gap-2 px-2" onSubmit={handleSubmit}>
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
      <Button type="submit">
        <span className="hidden md:block">Send</span>
        <span className="block">
          <Send />
        </span>
      </Button>
    </form>
  );
};
export default MessageInput;
