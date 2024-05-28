import {ChangeEvent, useEffect, useState} from "react";
import {useSetUser, useUser} from "../UserContext.ts";
import AuthRepository from "../repository/AuthRepository.ts";

export default function Tasks(
    props: {authRepository: AuthRepository}
) {

    const {
        todos,
        newTodo,
        user,
        changeTodoInput,
        clickSaveButton,
        clickLogoutButton
    } = useApp(props.authRepository)


    return (
        <>
            <h1>CSRF Attack Demo</h1>
            <div>{`ログインユーザー名: ${user?.username}`}</div>
            <input type="text" role='todoInput' onChange={(event) => changeTodoInput(event)} value={newTodo}/>
            <button onClick={clickSaveButton}>save todo</button>
            <div>{todos.map(todo => (
                    <div key={window.crypto.randomUUID()}>
                        {todo}
                    </div>
                )
            )}</div>
            <button onClick={clickLogoutButton}>ログアウト</button>
        </>
    )
}

function useApp(authRepository: AuthRepository) {
    const [todos, setTodos] = useState<string[]>([])
    const [newTodo, setNewTodo] = useState<string>('')
    const user = useUser()
    const setUser = useSetUser()

    useEffect(() => {
        fetchTodos()
    }, [])

    async function fetchTodos() {
        const beforeTodo = await fetch('/api/todos')
        const jsonTodo = await beforeTodo.json()
        setTodos(jsonTodo)
    }

    function changeTodoInput(event: ChangeEvent<HTMLInputElement>) {
        setNewTodo(event.target.value)
    }

    async function chickSaveButton() {
        await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: newTodo
        })
        setTodos([...todos, newTodo])
        setNewTodo('')
    }

    async function clickLogoutButton() {
        setUser(null)
        await authRepository.logout()
    }

    return {
        todos,
        newTodo,
        user,
        changeTodoInput,
        clickSaveButton: chickSaveButton,
        clickLogoutButton
    }
}

