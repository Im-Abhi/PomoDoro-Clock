import React, { useState } from 'react';
import Length from './Length';

function App(){
  const [ displayTime, setDisplayTime ] = useState(25*60);
  const [ breakTime, setBreakTime ] = useState(5*60);
  const [ sessionTime, setSessionTime ] = useState(25*60);
  const [ timerOn, setTimerOn ] = useState(false);
  const [ onBreak, setOnBreak ] = useState(false);
  const [ intervalId,setIntervalId ] = useState('');
  const playBreakSound = () => {
    const audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav")
    audio.currentTime = 0;
    audio.play();
  }
  function formatTime(time){
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    return (`${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`);
  }
  function changeTime(amount, type){
    if(!timerOn){
      if(type === 'Break'){
        if(breakTime <=60 && amount<0) return;
        setBreakTime( prev => prev + amount);
      }else{
        if(sessionTime <=60 && amount<0)  return;
        setSessionTime( prev => prev + amount);
        setDisplayTime(prev => prev + amount);
      }
    }
  }
  function reset(){
    setBreakTime(5*60);
    setSessionTime(25*60);
    setDisplayTime(25*60);
    setTimerOn(false);
    clearInterval(intervalId);
  }
  function controlTime(){
    if(!timerOn){
      setIntervalId(startTimer());
    } else {
      clearInterval(intervalId);
    }
    setTimerOn(!timerOn);
  }
  function startTimer(){
    var breakSes = false;
    return (setInterval(()=>{
      setDisplayTime( prev => {
        if(prev <= 0 && !breakSes){
          playBreakSound();
          setOnBreak(true);
          breakSes = true;
          return breakTime;
        }
        if(breakSes && prev <= 0){
          playBreakSound();
          breakSes = false;
          setOnBreak(false);
          return sessionTime;
        }
        return prev-1;
      });
    },1000));
  }
  return (
    <div>
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
      <h1>{onBreak?"Break":"Session"}</h1>
      <h1>{formatTime(displayTime)}</h1>
      <button name="play-pause" onClick={controlTime}>play-pause</button>
      <button name="reset" onClick={reset}>reset</button>
    </div>
  )
}

export default App;