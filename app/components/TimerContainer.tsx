import React, { useEffect, useState } from 'react';
import { NumberBox } from './NumberBox';

interface TimeProps {
  minutes: number | string;
  seconds: number | string;
}

export const TimerContainer = ({ minutes, seconds }: TimeProps) => {
  const [prevMinutes, setPrevMinutes] = useState<number | string>(minutes);
  const [prevSeconds, setPrevSeconds] = useState<number | string>(seconds);

  const [minutesFlip, setMinutesFlip] = useState<boolean>(false);
  const [secondsFlip, setSecondsFlip] = useState<boolean>(false);

  useEffect(() => {
    if (minutes !== prevMinutes) {
      setMinutesFlip(true);
      setPrevMinutes(minutes);
    } else {
      setMinutesFlip(false);
    }

    if (seconds !== prevSeconds) {
      setSecondsFlip(true);
      setPrevSeconds(seconds);
    } else {
      setSecondsFlip(false);
    }
  }, [minutes, seconds, prevMinutes, prevSeconds]);

  if (typeof seconds === 'number' && seconds < 10) {
    seconds = '0' + seconds;
  }

  if (typeof minutes === 'number' && minutes < 10) {
    minutes = '0' + minutes;
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
