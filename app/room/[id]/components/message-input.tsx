import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import socket from "@/lib/socket";
import { Send } from "lucide-react";
import { useRef, useState } from "react";

const MessageInput = ({ roomId }: { roomId: string }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.focus();
    const value = inputRef.current?.value;
    if (value?.trim() === "" || !value) {
      return;
    }
    socket.emit("punishment-message", roomId, inputRef.current?.value);
    setText("");
  };
  return (
    <form className="flex items-center gap-2 px-2" onSubmit={handleSubmit}>
      <Textarea
        autoFocus
        ref={inputRef}
        value={text}
        placeholder="Hurry up!!!"
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="max-h-24 min-h-10 resize-none"
      />

      <Button type="submit" className="h-10 self-end">
        <span className="hidden md:block">Send</span>
        <span className="block">
          <Send />
        </span>
      </Button>
    </form>
  );
};
export default MessageInput;
