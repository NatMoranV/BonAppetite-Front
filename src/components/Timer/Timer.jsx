import styled from "styled-components";
import { useEffect, useState } from "react";



export const Timer = ({ time, onTimeOff }) => {
    const [timeInSeconds, setTimeInSeconds] = useState(time); 
    const [countingUp, setCountingUp] = useState(false);
    const [timerRunning, setTimerRunning] = useState(true); stopped
  
    useEffect(() => {
      let intervalId;
  
      if (timerRunning) {
        intervalId = setInterval(() => {
          if (!countingUp) {
            if (timeInSeconds > 0) {
              setTimeInSeconds(timeInSeconds - 1);
            } else {
              onTimeOff();
              setCountingUp(true);
            }
          } else {
            setTimeInSeconds(timeInSeconds + 1);
          }
        }, 1000);
      }
  
      return () => clearInterval(intervalId);
    }, [timeInSeconds, countingUp, timerRunning, onTimeOff]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    const toggleTimer = () => {
      setTimerRunning(!timerRunning);
    };
  
    return (
      <div>
        <div>
          Tiempo: {countingUp ? `+` : '-'}{formatTime(timeInSeconds)}
        </div>
        <button onClick={toggleTimer}>{timerRunning ? 'Parar' : 'Iniciar'}</button>
      </div>
    );
  };