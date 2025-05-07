"use client";
import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCzi51XLusrnzorG21jPcukmc1bSOixbwU",
  authDomain: "punish-pad.firebaseapp.com",
  projectId: "punish-pad",
  storageBucket: "punish-pad.firebasestorage.app",
  messagingSenderId: "962618797892",
  appId: "1:962618797892:web:a7b4de02a4ffc0714cb111",
  measurementId: "G-LH6R4QG3Y2",
};

const firebaseapp = initializeApp(firebaseConfig);
export const messaging = () => getMessaging(firebaseapp);

export default firebaseapp;
