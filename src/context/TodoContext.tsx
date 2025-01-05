"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// تعریف نوع وظایف
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// تعریف نوع اکشن‌ها
type Action =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "EDIT_TODO"; payload: { id: string; text: string } }
  | { type: "REORDER_TODOS"; payload: { todos: Todo[] } }
  | { type: "SET_TODOS"; payload: Todo[] };

// تعریف نوع استیت
interface State {
  todos: Todo[];
}

interface TodoContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// مقدار اولیه استیت
const initialState: State = {
  todos: [], // مقدار پیش‌فرض خالی
};

// Reducer برای مدیریت استیت
const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      case "EDIT_TODO":
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, text: action.payload.text }
              : todo
          ),
        };      
   
    case "REORDER_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // بازیابی وظایف ذخیره‌شده از Local Storage فقط در کلاینت
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch({ type: "SET_TODOS", payload: JSON.parse(savedTodos) });
    }
  }, []); // فقط در اولین بار اجرا شود

  // ذخیره وظایف در Local Storage
  useEffect(() => {
    if (state.todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    }
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
