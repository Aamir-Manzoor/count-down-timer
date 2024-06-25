// components/TimerContainer.tsx
import React from 'react';
import { NumberBox } from './NumberBox';

interface TimeProps {
  days: number | string;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
}

export const TimerContainer: React.FC<TimeProps> = ({ days, hours, minutes, seconds }) => {
  let daysFlip = false;
  let hoursFlip = false;
  let minutesFlip = false;
  let secondsFlip = true;

  // Convert all values to numbers for calculation
  let numDays = typeof days === 'string' ? parseInt(days) : days;
  let numHours = typeof hours === 'string' ? parseInt(hours) : hours;
  let numMinutes = typeof minutes === 'string' ? parseInt(minutes) : minutes;
  let numSeconds = typeof seconds === 'string' ? parseInt(seconds) : seconds;

  if (numSeconds <= 0 && numMinutes <= 0 && numHours <= 0 && numDays <= 0) {
    daysFlip = false;
    hoursFlip = false;
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

  if (numMinutes === 0) {
    if (numHours !== 0) {
      numMinutes = 59;
    }

    minutesFlip = false;
    hoursFlip = true;
  }

  if (numHours === 0) {
    hoursFlip = false;
    if (numDays !== 0) {
      daysFlip = true;
    }
  }

  // Format numbers to be two digits
  const formatTime = (time: number): string => (time < 10 ? `0${time}` : `${time}`);

  return (
    <div className="mt-2 md:mt-20 rounded-xl">
      <div className="grid grid-cols-2 gap-4 py-6 px-10 md:flex md:items-center md:justify-between md:mt-2 rounded-xl md:px-6 md:py-8">
        <NumberBox num={formatTime(numDays)} unit="Days" flip={daysFlip} />
        <span className="hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50">:</span>
        <NumberBox num={formatTime(numHours)} unit="Hours" flip={hoursFlip} />
        <span className="hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50">:</span>
        <NumberBox num={formatTime(numMinutes)} unit="Minutes" flip={minutesFlip} />
        <span className="hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50">:</span>
        <NumberBox num={formatTime(numSeconds)} unit="Seconds" flip={secondsFlip} />
      </div>
    </div>
  );
};
