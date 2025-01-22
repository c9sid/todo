"use client"

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [todos, setTodos] = useState([]);
  const allTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/todos/', { cache: "no-store" })
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error(error, "Error while fetching todos")
    }
  }

  useEffect(() => {
    allTodos()
  }, [])

  return (
    <div className='py-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {todos.length > 0 && todos.map((todo) => (
          <Card key={todo.id} className="p-5">
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>{todo.desc}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Home
