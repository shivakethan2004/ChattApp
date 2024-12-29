"use client";
import React from "react";
import Button from "./components/ui/Button";
import { cn } from "./lib/utils";
import { Poppins } from "next/font/google";

let url: String = "https://www.google.com";
const font = Poppins({
  subsets:["latin"],
  weight:["600"]

})
export default function Home() {
 
  
  return (
   <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 ">
    
      
    hello
    
   </main>
  );
}
