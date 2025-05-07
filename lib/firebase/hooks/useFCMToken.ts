"use client";
import { useEffect, useState } from "react";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "../index";
import useNotificationPermission from "./useNotificationPermission";

const useFCMToken = (roomId: string) => {
  const permission = useNotificationPermission();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (permission === "granted") {
          const isFCMSupported = await isSupported();
          if (!isFCMSupported) return;
          const fcmToken = await getToken(messaging(), {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          setFcmToken(fcmToken);
          fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/send-token`, {
            method: "POST",
            body: JSON.stringify({ token: fcmToken, roomId }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          console.log("permission in useFcmtoken", permission);
        }
      }
    };
    retrieveToken();
  }, [permission, roomId]);

  return fcmToken;
};

export default useFCMToken;
