'use client'

import {createContext, ReactNode, useContext, useState} from "react";

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}



export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void; //call signature
    toggleTodoAsCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null)

export function TodosProvider({children}: { children: ReactNode }) {

    const [todos, setTodos] = useState<Todo[]>(() => {
        try{
        const newTodos = localStorage.getItem('todos') || "[]";
        return JSON.parse(newTodos) as Todo[]
        }catch (e) {
            return []
        }

    })
    function handleAddTodo(task: string) {
     
        setTodos((prev) => {
            // we will create a new array
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date(),
                },
                ...prev,
            ];
  
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }

    // toggleTodoAsCompleted
    const toggleTodoAsCompleted = (id: string) => {
        // function toggleTodoAsCompleted(id:string) {
        setTodos((prev) => {
            // console.log("completed "+ prev.map((val) => val ))
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return {...task, completed: !task.completed}
                }
                return task;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }

    // handleDeleteTodo
    function handleDeleteTodo(id: string) {
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id !== id)
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        });

    }

    return (
        // @ts-ignore
        <todosContext.Provider value={{todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
            {children}
        </todosContext.Provider>
    );
}

export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw Error("useTodos used outside of Provider");
    }

    return todosContextValue;
}
