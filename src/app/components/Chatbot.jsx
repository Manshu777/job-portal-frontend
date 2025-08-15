"use client"
import React from 'react'
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyD-OymixUgjyYpTJ5gJ46sWDUAGBLiesRY" });




const Chatbot = () => {
const main=async()=>{
   const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "about india",
  });
  console.log(response.text);
}


  return (
    <div>


        <button onClick={main}>done </button>
    </div>
  )
}

export default Chatbot