import React from 'react';
import { NumberBox } from './NumberBox';

interface TimeProps {
  minutes: number | string;
  seconds: number | string;
}

export const TimerContainer = ({ minutes, seconds }: TimeProps) => {
  let minutesFlip = false;
  let secondsFlip = true;

  let numMinutes = typeof minutes === 'string' ? parseInt(minutes) : minutes;
  let numSeconds = typeof seconds === 'string' ? parseInt(seconds) : seconds;

  if (numSeconds <= 0 && numMinutes <= 0) {
    minutesFlip = false;
    secondsFlip = false;
  }

  if (numSeconds === 0) {
    if (numMinutes !== 0) {
      numSeconds = 59;
    }
    secondsFlip = false;
    minutesFlip = true;
  }

  if (numMinutes < 10) {
    minutes = '0' + numMinutes;
  } else {
    minutes = numMinutes.toString();
  }

  if (numSeconds < 10) {
    seconds = '0' + numSeconds;
  } else {
    seconds = numSeconds.toString();
  }

  return (
    <div className="mt-2 md:mt-20 rounded-xl">
      <div className="grid grid-cols-2 gap-4 py-6 px-10 md:flex md:items-center md:justify-between md:mt-2 rounded-xl md:px-6 md:py-8">
        <NumberBox num={minutes} unit="Minutes" flip={minutesFlip} />
        <span className="hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50">:</span>
        <NumberBox num={seconds} unit="Seconds" flip={secondsFlip} />
      </div>
    </div>
  );
};
