import socket from "@/lib/socket";
import { useRoom } from "@/providers/room-provider";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Progress = () => {
  const params = useParams<{ id: string }>();
  const {
    state: { room, setRoom },
  } = useRoom(params.id);

  useEffect(() => {
    socket.on("phrase-submitted", (hits: number, misses: number) => {
      setRoom((room) => {
        if (!room) return null;
        return { ...room, hits, misses };
      });
    });
  }, [room, setRoom]);
  return (
    <div>
      <div>
        <p>hits and misses</p>
        <p>hits: {room?.hits}</p>
        <p>misses: {room?.misses}</p>
      </div>
    </div>
  );
};
export default Progress;
