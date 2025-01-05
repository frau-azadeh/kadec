'use client';
import React, { useState, useEffect } from "react";
import { Button, InputNumber, Space } from "antd";

interface TaskTimerProps {
  id: string;
  onComplete: () => void;
}

const TaskTimer: React.FC<TaskTimerProps> = ({ id, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // زمان باقی‌مانده
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      onComplete(); 
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(null);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Space>
        {timeLeft === null ? (
          <InputNumber
            min={1}
            max={3600}
            placeholder="زمان (ثانیه)"
            onChange={(value) => setTimeLeft(value || null)}
          />
        ) : (
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
              timeLeft % 60
            }`}
          </span>
        )}
        {isRunning ? (
          <Button type="primary" onClick={handlePause}>
            توقف
          </Button>
        ) : (
          <Button type="primary" onClick={handleStart} disabled={timeLeft === null}>
            شروع
          </Button>
        )}
        <Button onClick={handleReset} danger>
          بازنشانی
        </Button>
      </Space>
    </div>
  );
};

export default TaskTimer;
