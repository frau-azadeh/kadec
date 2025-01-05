'use client'
import React from "react";
import { Form, Input, Button } from "antd";
import { useTodos } from "@/context/TodoContext";

const TodoForm: React.FC = () => {
  const [form] = Form.useForm();
  const { dispatch } = useTodos(); 

  const onFinish = (values: { task: string }) => {
   
    dispatch({ type: "ADD_TODO", payload: { text: values.task } });


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
        style={{ width: "300px" }}
      >
        <Input placeholder="اضافه کردن وظیفه جدید" />
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
