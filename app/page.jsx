"use client"

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Home = () => {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const allTodos = async () => {
    try {
      const res = await fetch('https://todo-pi-teal.vercel.app/api/todos/', { cache: "no-store" })
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      toast.error(error, "Error while fetching todos")
    }
  }

  useEffect(() => {
    allTodos()
  }, [])

  const addTodo = async () => {
    if (title == "" || desc == "") {
      toast.error("Both are required")
      return;
    }

    try {
      const res = await fetch('https://todo-pi-teal.vercel.app/api/todos/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          desc
        })
      });
      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await res.json();
      setTitle('')
      setDesc('')
      toast.success(`${title} added`)
      return Response.json(newTodo)
    } catch (error) {
      toast.error("Can't create todo", error)
    }
  }

  return (
    <div className='py-5'>
      <h2 className='py-5 text-2xl text-center'>Todos ({todos.length})</h2>
      <div>
        {todos.length > 0 && todos ? todos.map((todo) => (
          <div key={todo.id} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Card className="p-5">
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription>{todo.desc}</CardDescription>
            </Card>
          </div>
        )) :
          <div className='grid'>
            <p className='text-center text-neutral-500'>Not found</p>
          </div>
        }
      </div>

      {/* Add todo */}
      <div className="fixed bottom-5 right-5">
        <form>
          <Dialog>
            <DialogTrigger className='p-4 rounded-full bg-primary text-white'><Plus /></DialogTrigger>
            <DialogContent className="w-11/12 rounded-lg">
              <DialogHeader>
                <DialogTitle className="pb-5">Add todo</DialogTitle>
                <DialogDescription className="flex flex-col gap-3">
                  <Input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter title" />
                  <Input onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Enter description" />
                  <Button onClick={addTodo}>Add Todo</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </form>
      </div>
    </div>
  )
}

export default Home
