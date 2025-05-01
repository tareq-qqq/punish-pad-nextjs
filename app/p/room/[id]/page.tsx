"use client";
import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { useRoom } from "@/providers/room-provider";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ id: string }>();
  const {
    state: { room, setRoom },
    errorState: { error },
  } = useRoom(params.id);

  if (error) {
    return <div>{error}</div>;
  }
  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{JSON.stringify(room, null, 2)}</div>;
      <Input
        type="text"
        value={room.currentPhrase}
        onChange={(e) => {
          setRoom({ ...room, currentPhrase: e.target.value });
          socket.emit("typing", params.id, e.target.value);
        }}
      />
    </div>
  );
};
export default Page;
