"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TimerContainer } from './components/TimerContainer';

const Home: NextPage = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(interval!);
              setMessage('The Launch Has Started');
              setIsActive(false);
              return 0;
            }
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isActive, seconds, minutes]);

  const handleStart = () => {
    setIsActive(true);
    setMessage('');
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setMessage('');
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1e1f29]">
      <Head>
        <title>Launch Countdown Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header message={message} />

      <TimerContainer minutes={minutes} seconds={seconds} />

      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={handleStop}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
