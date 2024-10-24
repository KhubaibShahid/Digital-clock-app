"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState, useRef } from "react";

export default function App() {

  let interval = useRef<NodeJS.Timeout | undefined>();

  const [time, setTime] = useState("")
  const [btn, setBtn] = useState("24-hour");

  function timer24() {
      interval.current = setInterval(() => {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        setTime(`${h}:${m}:${s}`);
      }, 1000)
  }
  
  function timer12() {
      interval.current = setInterval(() => {
        let date = new Date();
        setTime(date.toLocaleTimeString())
      }, 1000)
  }

 let memo = useMemo(() => {
    if (btn == "24-hour") {
      clearInterval(interval.current);
      timer24()
    } else {
      clearInterval(interval.current);
      timer12()
    }
  }, [btn])
  useEffect(() => {
    memo
  }, [])


  return (
    <div className="w-full h-svh bg-gray-50 px-2 flex justify-center items-center">
      <div className="bg-white max-w-md w-full min-h-20 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Digital Clock</h1>
        <p className="text-sm text-center text-gray-500">Display current time in hours, minutes, and seconds.</p>
        <div className="font-bold text-5xl text-center my-4">{time}</div>
        <div className="flex gap-5 justify-center mt-5">
          <Button onClick={() => setBtn("24-hour")} variant={btn == "24-hour" ? "default" : "outline" }>24-Hour Format</Button>
          <Button onClick={() => setBtn("12-hour")} variant={btn == "12-hour" ? "default" : "outline"}>12-Hour Format</Button>
        </div>
      </div>
    </div>
  )
}