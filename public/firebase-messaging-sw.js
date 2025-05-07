// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

console.log("service worker");

const firebaseConfig = {
  apiKey: "AIzaSyCzi51XLusrnzorG21jPcukmc1bSOixbwU",
  authDomain: "punish-pad.firebaseapp.com",
  projectId: "punish-pad",
  storageBucket: "punish-pad.firebasestorage.app",
  messagingSenderId: "962618797892",
  appId: "1:962618797892:web:a7b4de02a4ffc0714cb111",
  measurementId: "G-LH6R4QG3Y2",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
});
