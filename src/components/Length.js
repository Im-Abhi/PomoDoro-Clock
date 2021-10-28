import React from 'react';

export default function Length({title, changeTime, type, time}){
    return(
        <div className="length">
            <p id={type==='Break'?"break-label":"session-label"}>{title}</p>
            <div className="inc-dec">
                <button id={type==='Break'?"break-increment":"session-increment"}
                    onClick={()=>changeTime(60, type)}
                ><i class="fa fa-2x fa-arrow-up" aria-hidden="true"></i>
                </button>
                <span id={type==='Break'?"break-length":"session-length"}>{(time/60)}</span>
                <button id={type==='Break'?"break-decrement":"session-decrement"}
                    onClick={()=>changeTime(-60, type)}
                ><i class="fa fa-2x fa-arrow-down" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
  }
  