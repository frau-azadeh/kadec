"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import FilterButtons from "@/components/FilterButtons";
import { useTodos } from "../context/TodoContext";

const { Header, Content, Footer } = Layout;

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const { state } = useTodos();

  const filteredTodos = state.todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const remainingTasks = state.todos.filter((todo) => !todo.completed).length;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", color: "#fff", textAlign: "center", padding: "10px" }}>
        <h1 style={{ color: "#fff" }}>مدیریت وظایف</h1>
      </Header>
      <Content style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TodoForm />
        <FilterButtons filter={filter} setFilter={setFilter} remainingTasks={remainingTasks} />
        <TodoList filter={filter} />
      </Content>
      <Footer style={{ textAlign: "center" }}>To-Do App ©2025 Created by Azadeh Sharifi Soltani</Footer>
    </Layout>
  );
};

export default Dashboard;
