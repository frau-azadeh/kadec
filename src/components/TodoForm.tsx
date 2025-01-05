"use client";
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useTodos } from "@/context/TodoContext";

const { Option } = Select;

const TodoForm: React.FC = () => {
  const [form] = Form.useForm();
  const { dispatch } = useTodos();

  const onFinish = (values: { task: string; priority: "low" | "medium" | "high" }) => {
    dispatch({ type: "ADD_TODO", payload: { text: values.task, priority: values.priority } });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="inline"
      style={{ marginBottom: "20px", justifyContent: "center" }}
    >
      <Form.Item
        name="task"
        rules={[{ required: true, message: "لطفاً وظیفه‌ای وارد کنید!" }]}
        style={{ width: "200px" }}
      >
        <Input placeholder="اضافه کردن وظیفه جدید" />
      </Form.Item>
      <Form.Item
        name="priority"
        rules={[{ required: true, message: "لطفاً اولویت را انتخاب کنید!" }]}
        style={{ width: "120px" }}
      >
        <Select placeholder="اولویت">
          <Option value="low">کم</Option>
          <Option value="medium">متوسط</Option>
          <Option value="high">زیاد</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          افزودن
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
