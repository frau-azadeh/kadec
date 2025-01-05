import React from "react";
import { Button } from "antd";

interface FilterButtonsProps {
  setFilter: React.Dispatch<React.SetStateAction<"all" | "completed" | "pending">>;
  filter: "all" | "completed" | "pending";
  remainingTasks: number;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  setFilter,
  filter,
  remainingTasks,
}) => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <p style={{ fontWeight: "bold" }}>تعداد وظایف باقی‌مانده: {remainingTasks}</p>
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
    </div>
  );
};

export default FilterButtons;
