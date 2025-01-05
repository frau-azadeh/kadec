"use client";
import React from "react";
import { Button } from "antd";

interface FilterButtonsProps {
  filter: "all" | "completed" | "pending";
  setFilter: (filter: "all" | "completed" | "pending") => void;
  remainingTasks: number;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter, remainingTasks }) => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <Button
        type={filter === "all" ? "primary" : "default"}
        onClick={() => setFilter("all")}
        style={{ marginRight: 8 }}
      >
        همه
      </Button>
      <Button
        type={filter === "completed" ? "primary" : "default"}
        onClick={() => setFilter("completed")}
        style={{ marginRight: 8 }}
      >
        انجام‌شده
      </Button>
      <Button
        type={filter === "pending" ? "primary" : "default"}
        onClick={() => setFilter("pending")}
      >
        انجام‌نشده
      </Button>

      <p style={{ marginTop: 20, fontWeight: "bold" }}>
        تعداد وظایف باقی‌مانده: {remainingTasks}
      </p>
    </div>
  );
};

export default FilterButtons;
