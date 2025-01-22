import prisma from "@/lib/prisma"

// GET todos
export async function GET() {
    const todos = await prisma.todo.findMany()
    return Response.json(todos)
}

// POST todo
export async function POST(res) {
    const body = await res.json()
    const newTodo = await prisma.todo.create({
        data: {
            title: body.title,
            desc: body.desc
        }
    })
    return Response.json(newTodo, { status: 201 }, { message: "Todo added successfully" })
}