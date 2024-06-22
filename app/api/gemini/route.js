

// pages/api/gemini/route.js

//AIzaSyAgCeuyEqwHtQLr6Bn3FbGgJf_WNnIjKvE
// pages/api/gemini/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const ai = new GoogleGenerativeAI("AIzaSyAgCeuyEqwHtQLr6Bn3FbGgJf_WNnIjKvE"); // Replace with your actual API key

export async function POST (req, res) {
  
    try {
        const body = await req.json()
      const { history, message } = body;
console.log(history,message)
      // Example logic using your GoogleGenerativeAI code
      const model = ai.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();
return NextResponse.json(text)
    //   res.json({ text });
    } catch (error) {
      console.error(error);
     return NextResponse.json(error)
    }

}

