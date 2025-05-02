import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { useEffect, useRef, useState } from "react";

const PhraseInput = ({
  roomId,
  currentPhrase,
}: {
  roomId: string;
  currentPhrase: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
    const value = inputRef.current?.value;
    if (value?.trim() === "" || !value) {
      return;
    }
    socket.emit("submit-phrase", roomId, inputRef.current?.value, new Date());
    socket.emit("typing", roomId, "");
    setText("");
    // inputRef.current!.value = "";
    inputRef.current!.focus();
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        autoFocus
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          socket.emit("typing", roomId, e.target.value);
        }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
export default PhraseInput;
