// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {

    apiKey:process.env.Api_Key ,
  
    authDomain: process.env.AuthDomain,
  
    projectId: "inventory-cd2f4",
  
    storageBucket: process.env.StorageBucket,
  
    messagingSenderId:process.env.MessagingSenderId ,
  
    appId: process.env.AppId,
  
    measurementId: process.env.MeasurementId
  
  };
  
  
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);