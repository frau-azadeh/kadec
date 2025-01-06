'use client';
import React, { useState } from "react";
import { List, Checkbox, Button, Input, Space } from "antd";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useTodos } from "@/context/TodoContext";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const toggleTodo = () => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };

  const deleteTodo = () => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  const saveEditedTodo = () => {
    if (editedText.trim() === "") {
      alert("متن وظیفه نمی‌تواند خالی باشد.");
      return;
    }
    dispatch({ type: "EDIT_TODO", payload: { id, text: editedText } });
    setIsEditing(false);
  };

  const handleTimerComplete = () => {
    alert(`تایمر برای وظیفه "${text}" تمام شد!`);
  };

  return (
    <List.Item
      actions={[
        isEditing ? (
          <Button
            icon={<SaveOutlined />}
            onClick={saveEditedTodo}
            type="primary"
          >
            ذخیره
          </Button>
        ) : (
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
            type="default"
          >
            ویرایش
          </Button>
        ),
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={deleteTodo}
          type="default"
        >
          حذف
        </Button>,
      ]}
    >
      <Space direction="vertical">
        <Space>
          <Checkbox checked={completed} onChange={toggleTodo} />
          {isEditing ? (
            <Input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              style={{ width: "300px" }}
            />
          ) : (
            <span style={{ textDecoration: completed ? "line-through" : "none" }}>
              {text}
            </span>
          )}
        </Space>
      </Space>
    </List.Item>
  );
};

export default TodoItem;
