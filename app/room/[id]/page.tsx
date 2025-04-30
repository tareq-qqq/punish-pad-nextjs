"use client";

import socket from "@/lib/socket";
import { Room } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit(
      "joinRoom",
      params.id,
      ({ room, error }: { room?: Room; error?: string }) => {
        if (error) {
          console.error(error);
          return;
        }

        socket.on("typing", (text: string) => {
          setText(text);
        });
      },
    );
  });
  return <div>{text}</div>;
};
export default Page;
