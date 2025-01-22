"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const allTodos = async () => {
    try {
      const res = await fetch("https://todo-pi-teal.vercel.app/api/todos/", {
        cache: "no-store",
      });
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      toast.error("Error while fetching todos");
    }
  };

  useEffect(() => {
    allTodos();
  }, []);

  const addTodo = async () => {
    if (title === "" || desc === "") {
      toast.error("Both title and description are required");
      return;
    }

    const newTodo = { id: Date.now(), title, desc }; // Temporary todo with a unique id

    // Optimistic update
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitle("");
    setDesc("");

    try {
      const res = await fetch("https://todo-pi-teal.vercel.app/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      // Refetch to sync with server
      await allTodos();
      toast.success(`${title} added`);
    } catch (error) {
      toast.error("Can't create todo");
      // Rollback optimistic update if error occurs
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== newTodo.id)
      );
    }
  };

  return (
    <div className="py-5">
      <h2 className="py-5 text-2xl text-center">Todos ({todos.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {todos.length > 0 &&
          todos.map((todo) => (
            <div key={todo.id}>
              <Card className="p-5">
                <CardTitle className="line-clamp-1">{todo.title}</CardTitle>
                <CardDescription className="line-clamp-1">{todo.desc}</CardDescription>
              </Card>
            </div>
          ))}
      </div>
      <div>
        {todos.length === 0 && (
          <div>
            <p className="text-center text-neutral-500">Not Found</p>
          </div>
        )}
      </div>

      {/* Add todo */}
      <div className="fixed bottom-5 right-5">
        <form>
          <Dialog>
            <DialogTrigger className="p-4 rounded-full bg-primary text-white">
              <Plus />
            </DialogTrigger>
            <DialogContent className="w-11/12 rounded-lg">
              <DialogHeader>
                <DialogTitle className="pb-5">Add todo</DialogTitle>
                <DialogDescription className="flex flex-col gap-3">
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Enter title"
                  />
                  <Input
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    placeholder="Enter description"
                  />
                  <Button onClick={addTodo} type="button">
                    Add Todo
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </form>
      </div>
    </div>
  );
};

export default Home;
