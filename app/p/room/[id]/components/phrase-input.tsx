import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import socket from "@/lib/socket";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PhraseInput = ({
  roomId,
  currentPhrase,
  roomStatus,
}: {
  roomId: string;
  currentPhrase: string;
  roomStatus: string;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>(currentPhrase);

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.focus();
    const value = inputRef.current?.value;
    if (value?.trim() === "" || !value) {
      return;
    }
    socket.emit("submit-phrase", roomId, inputRef.current?.value, new Date());
    socket.emit("typing", roomId, "");
    setText("");
    // inputRef.current!.value = "";
  };
  return (
    <form className="flex items-stretch gap-2 px-2" onSubmit={handleSubmit}>
      <Textarea
        autoFocus
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        value={text}
        placeholder="Start typing..."
        onChange={(e) => {
          setText(e.target.value);
          socket.emit("typing", roomId, e.target.value);
        }}
        disabled={roomStatus === "finished"}
        className="max-h-24 min-h-10 resize-none"
        rows={1}
      />
      <Button
        className="h-full min-h-10"
        type="submit"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="hidden md:block">Send</span>
        <span className="block">
          <Send />
        </span>
      </Button>
    </form>
  );
};
export default PhraseInput;
