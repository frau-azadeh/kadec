'use client';
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTodos } from "@/context/TodoContext";

const COLORS = ["#00C49F", "#FF8042"]; 

const TaskPieChart: React.FC = () => {
  const { state } = useTodos();

  const completedCount = state.todos.filter((todo) => todo.completed).length;
  const pendingCount = state.todos.length - completedCount;

  const data = [
    { name: "انجام‌شده", value: completedCount },
    { name: "انجام‌نشده", value: pendingCount },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "auto" }}>
      <h3 style={{ textAlign: "center" }}>نمودار وضعیت وظایف</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskPieChart;
