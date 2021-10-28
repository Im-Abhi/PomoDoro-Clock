import React, { useState, useRef } from 'react';
import Length from './Length';

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [intervalId, setIntervalId] = useState("");
  const [ curSession, setCurSession ] = useState('Session'); 
  const audioRef = useRef();
  const playBreakSound = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 2000);
  };
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
  function changeTime(amount, type){
    if(!timerOn){
      if(type === 'Break'){
        if(breakTime <=60 && amount<0) return;
        if(breakTime >= 3600 && amount>0) return;
        setBreakTime( prev => prev + amount);
      }else{
        if(sessionTime <=60 && amount<0)  return;
        if(sessionTime >= 3600 && amount>0) return;
        setSessionTime( prev => prev + amount);
      }
        setDisplayTime(prev => prev + amount);
    }
  }
  function reset() {
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setDisplayTime(25 * 60);
    setCurSession("Session");
    setTimerOn(false);
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    clearInterval(intervalId);
  }
  function controlTime() {
    if (!timerOn) {
      setIntervalId(startTimer());
    } else {
      clearInterval(intervalId);
    }
    setTimerOn(!timerOn);
  }
  function startTimer() {
    var breakSes = false;
    return setInterval(() => {
      setDisplayTime((prev) => {
        if (prev <= 0 && !breakSes) {
          setCurSession("Break");
          playBreakSound();
          setOnBreak(true);
          breakSes = true;
          return breakTime;
        }
        else if (breakSes && prev <= 0) {
          setCurSession("Session");
          playBreakSound();
          setOnBreak(false);
          breakSes = false;
          return sessionTime;
        }
        return prev - 1;
      });
    }, 1000);
  }
  return (
    <div id="container">
      <h1 id="title">25 + 5 Clock</h1>
      <div className="time-controls">
        <Length
          title="Break Length"
          changeTime={changeTime}
          type="Break"
          time={breakTime}
          formatTime={formatTime}
        />
        <Length
          title="Session Length"
          changeTime={changeTime}
          type="Session"
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>
      <div className="current-session">
       {/* <p id="timer-label">{onBreak === true ? "Break" : "Session"}</p>  */}
        <p id="timer-label">{curSession}</p>
        <h1 id="time-left">{formatTime(displayTime)}</h1>
      </div>
      <div className="control-btns">
        <button id="start_stop" name="play-pause" onClick={controlTime}>
          <i class="fa fa-2x fa-play" aria-hidden="true"></i>
        </button>
        <button id="start_stop" name="play-pause" onClick={controlTime}>
          <i class="fa fa-2x fa-pause" aria-hidden="true"></i>
        </button>
        <button id="reset" name="reset" onClick={reset}>
          <i class="fa fa-2x fa-refresh" aria-hidden="true"></i>
        </button>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={audioRef}
        />
      </div>
    </div>
  );
}
export default App;