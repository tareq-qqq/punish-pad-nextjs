"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Room } from "@/lib/types";
import { useRoom } from "@/providers/room-provider";
import socket from "@/lib/socket";

const Page = () => {
  const router = useRouter();
  const {
    state: { setRoom },
    errorState: { setError },
  } = useRoom();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    partnerName: "",
    phrase: "",
    repetitions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setIsSubmitting(true);

    socket.emit("create-room", formData, ({ room }: { room: Room }) => {
      console.log(room);
      if (room) {
        setRoom(room);
        setError(null);
        router.push(`/link/${room.roomId}`);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold">Create a New Room</h1>
          <p className="text-muted-foreground">
            Set up a new writing session for your partner to complete.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="ownerName">Your Name</Label>
            <Input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="partnerName">Partner&apos;s Name</Label>
            <Input
              type="text"
              id="partnerName"
              name="partnerName"
              value={formData.partnerName}
              onChange={handleChange}
              placeholder="Enter partner's name"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phrase">Punishment Line</Label>
            <Input
              type="text"
              id="phrase"
              name="phrase"
              value={formData.phrase}
              onChange={handleChange}
              placeholder="Enter the phrase to write"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="repetitions">How many times?</Label>
            <Input
              type="number"
              id="repetitions"
              name="repetitions"
              value={formData.repetitions}
              onChange={handleChange}
              placeholder="Enter number of repetitions"
              min="1"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Room..." : "Create Room"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
