import React, { useState, useEffect } from "react";
import "./Time.css";

export default function Time() {
  const [time, setTime] = useState("");

  const now = new Date();
  let seconds = now.getSeconds();
  let minutes = now.getMinutes();
  let hours = now.getHours();

  const incrementSeconds = () => {
    if (seconds >= 51) {
      seconds = 0;
      incrementMinutes();
      return;
    }
    seconds += 9;
    setTime(displayTime());
  };

  const incrementMinutes = () => {
    if (minutes === 59) {
      incrementHours();
      minutes = 0;
      return;
    }
    minutes += 1;
  };

  const incrementHours = () => {
    if (hours === 23) {
      hours = 0;
      return;
    }
    hours += 1;
  };

  const displayTime = () => {
    return `${add0First(hours)}:${add0First(minutes)}`;
  };

  // Adds the "0" placeholder in case the number is only one digit
  const add0First = (number: number) => {
    if (number < 10) return `0${number}`;
    return number.toString();
  };

  useEffect(() => {
    setTime(displayTime);
    setInterval(() => {
      incrementSeconds();
    }, 9000);
  }, []);

  return (
    <h1 className="text-9xl font-bold text-white time-display select-none block">
      {time}
    </h1>
  );
}
