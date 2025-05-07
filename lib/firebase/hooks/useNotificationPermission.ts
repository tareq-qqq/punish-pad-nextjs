"use client";
import { useEffect, useState } from "react";

const useNotificationPermissionStatus = () => {
  const [permission, setPermission] = useState<
    NotificationPermission | undefined
  >();

  useEffect(() => {
    const handler = () => {
      console.log("handler");
      setPermission(Notification.permission);
    };
    handler();

    // I'm not asking for it here I just want to get the status
    navigator.permissions
      .query({ name: "notifications" })
      .then((notificationPerm) => {
        notificationPerm.onchange = handler;
      });
  }, []);

  return permission;
};

export default useNotificationPermissionStatus;
