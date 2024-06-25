import React from 'react';

interface TimerInputProps {
  value: number;
  handleClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TimerInput: React.FC<TimerInputProps> = ({ value, handleClick, handleChange }) => {
  return (
    <div className="mt-4">
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="p-2 rounded-md border border-gray-300"
        placeholder="Set time in minutes"
      />
      <button onClick={handleClick} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Set Timer
      </button>
    </div>
  );
};
