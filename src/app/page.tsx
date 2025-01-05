"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import FilterButtons from "@/components/FilterButtons";
import { useTodos } from "../context/TodoContext";
import TaskProgress from "@/components/TaskProgress";

const { Header, Content, Footer } = Layout;

const Dashboard: React.FC = () => {
  const { state } = useTodos();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const remainingTasks = state.todos.filter((todo) => !todo.completed).length;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <h1 style={{ color: "#fff", margin: 0 }}>مدیریت وظایف</h1>
      </Header>
      <Content
        style={{
          margin: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <TodoForm />
          <TaskProgress/>
          <FilterButtons
            setFilter={setFilter}
            filter={filter}
            remainingTasks={remainingTasks}
          />
          <TodoList filter={filter} />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "#fff",
        }}
      >
        To-Do App ©2025 Created by Azadeh Sharifi Soltani
      </Footer>
    </Layout>
  );
};

export default Dashboard;
