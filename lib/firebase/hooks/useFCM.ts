"use client";
import { useEffect, useState } from "react";
import useFCMToken from "./useFCMToken";
import { messaging } from "@/lib/firebase";
import { MessagePayload, onMessage } from "firebase/messaging";
import { toast } from "sonner";

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const fcmmessaging = messaging();
      const unsubscribe = onMessage(fcmmessaging, (payload) => {
        toast.message(payload.notification?.title);
        setMessages((messages) => [...messages, payload]);
      });
      return () => unsubscribe();
    }
  }, [fcmToken]);

  return { fcmToken, messages };
};

export default useFCM;
