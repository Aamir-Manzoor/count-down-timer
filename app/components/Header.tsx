import React from 'react';

interface HeaderProps {
  message: string;
}

export const Header: React.FC<HeaderProps> = ({ message }) => {
  return (
    <header className="mt-10 text-center">
      <h1 className="text-4xl font-bold text-white">Launch Countdown Timer</h1>
      {message && <p className="mt-2 text-lg text-red-500">{message}</p>}
    </header>
  );
};
