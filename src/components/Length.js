import React from 'react';

export default function Length({title, changeTime, type, time}){
    return(
        <div>
            <h3>{title}</h3>
            <div>
                <button
                    onClick={()=>changeTime(60, type)}
                >&uarr;
                </button>
                <span>{(time/60)}</span>
                <button
                    onClick={()=>changeTime(-60, type)}
                >&darr;
                </button>
            </div>
        </div>
    );
  }
  