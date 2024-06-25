"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TimerContainer } from './components/TimerContainer';


const Home: NextPage = () => {
  const [newTime, setNewTime] = useState<number>(25); // default time in minutes
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [countDownDate, setCountDownDate] = useState<number | null>(null);

  useEffect(() => {
    if (countDownDate === null) return;

    const updateTime = setInterval(() => {
      const now = new Date().getTime();
      const difference = countDownDate - now;

      const newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setMinutes(newMinutes);
      setSeconds(newSeconds);

      if (difference <= 0) {
        clearInterval(updateTime);
        setMessage('The Launch Has Started');
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(updateTime);
  }, [countDownDate]);

  const handleClick = () => {
    const timeInMilliseconds = newTime * 60 * 1000;
    setCountDownDate(new Date().getTime() + timeInMilliseconds);
    setMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = parseInt(e.target.value, 10);
    setNewTime(inputTime);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1e1f29]">
      <Head>
        <title>Launch Countdown Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header message={message} />

      <TimerContainer minutes={minutes} seconds={seconds} />

      <Footer />
    </div>
  );
};

export default Home;

