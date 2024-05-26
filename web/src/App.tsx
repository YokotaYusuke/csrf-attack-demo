import {ChangeEvent, useEffect, useState} from "react";

export default function App() {

    const {todos, changeTodoInput, chickSaveButton, newTodo} = useApp()

    return (
        <>
            <h1>CSRF Attack</h1>
            <input type="text" role='todoInput' onChange={(event) => changeTodoInput(event)} value={newTodo}/>
            <button onClick={chickSaveButton}>save todo</button>
            <div>{todos.map(todo => (
                    <div key={window.crypto.randomUUID()}>
                        {todo}
                    </div>
                )
            )}</div>
        </>
    )
}

function useApp() {
    const [todos, setTodos] = useState<string[]>([])
    const [newTodo, setNewTodo] = useState<string>('')

    useEffect(() => {
        fetchTodos()
    },[])

    async function fetchTodos() {
        const beforeTodo = await fetch('/api/todos')
        const jsonTodo = await beforeTodo.json()
        setTodos(jsonTodo)
    }

    function changeTodoInput(event: ChangeEvent<HTMLInputElement>) {
        setNewTodo(event.target.value)
    }

    async function chickSaveButton() {
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: newTodo
        })
        setTodos([...todos, newTodo])
        setNewTodo('')
        console.log(res)
    }

    return {todos, changeTodoInput, chickSaveButton, newTodo}
}

