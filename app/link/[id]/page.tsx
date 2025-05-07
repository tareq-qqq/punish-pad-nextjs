"use client";
import { useRoom } from "@/providers/room-provider";
import socket from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFCMToken from "@/lib/firebase/hooks/useFCMToken";

// check later if the room is not available to show an error
const Page = () => {
  const token = useFCMToken();
  console.log(token);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;
  const [isCopying, setIsCopying] = useState(false);
  const {
    errorState: { error },
  } = useRoom(id);

  const fullUrl = `${window.location.origin}/p/room/${id}`;

  const copyToClipboard = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
      console.error(err);
    } finally {
      setIsCopying(false);
    }
  };

  useEffect(() => {
    socket.on("joined-room", (room: string, socketId: string) => {
      console.log(room, socketId);
      if (room === id) {
        console.log("user joined room", room, socketId);
        router.push(`/room/${id}`);
      }
    });
  }, [id, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-destructive/50 bg-destructive/10 rounded-lg border p-6 text-center">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold">
          Waiting for the other person to join...
        </h1>
        <p className="text-muted-foreground">Share this link with them</p>
      </div>

      <div className="bg-card flex w-full max-w-md items-center gap-2 rounded-lg border p-4">
        <p className="text-muted-foreground flex-1 truncate text-sm">
          {fullUrl}
        </p>
        <button
          onClick={copyToClipboard}
          disabled={isCopying}
          className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {isCopying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Page;
