"use client";
import { Toaster } from "@/components/ui/sonner";
import RoomProvider from "./room-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider>
      {children}
      <Toaster position="top-center" />
    </RoomProvider>
  );
};
export default Providers;
