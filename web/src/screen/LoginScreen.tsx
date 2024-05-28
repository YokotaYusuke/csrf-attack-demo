import {useState} from "react";
import {useSetUser} from "../UserContext.ts";
import AuthRepository from "../repository/AuthRepository.ts";

export default function LoginScreen(
    props: {authRepository: AuthRepository}
) {
    const {
        username,
        password,
        userAlreadyHasAnAccount,
        setUsername,
        setPassword,
        clickLoginButton,
        clickSignupButton,
        setUserAlreadyHasAnAccount
    } = useLoginScreen(props.authRepository)

    return(
        <>
            <h1>ログインページ</h1>
            <input
                type="text"
                value={username}
                placeholder='ユーザー名を入力'
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                type="text"
                value={password}
                placeholder='パスワードを入力'
                onChange={(event) => setPassword(event.target.value)}
            />
            {userAlreadyHasAnAccount
                ? <button onClick={clickLoginButton}>ログイン</button>
                : <button onClick={clickSignupButton}>サインアップ</button>
            }
            {userAlreadyHasAnAccount
                ? <div>アカウントをお持ちでない場合は
                    <button onClick={() => setUserAlreadyHasAnAccount(false)}>こちら</button>
                </div>
                : <div>アカウントをお持ちの方は
                    <button onClick={() => setUserAlreadyHasAnAccount(true)}>こちら</button>
                </div>
            }
        </>
    )
}

function useLoginScreen(authRepository: AuthRepository) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userAlreadyHasAnAccount, setUserAlreadyHasAnAccount] = useState(true)
    const setUser = useSetUser()

    const clickLoginButton = async () => {
        await authRepository.login(username, password)
        const user = await authRepository.getUser()
        setUser(user)
    }

    const clickSignupButton = async () => {
        await authRepository.signup(username, password)
        const user = await authRepository.getUser()
        setUser(user)
    }

    return {
        username,
        password,
        userAlreadyHasAnAccount,
        setUsername,
        setPassword,
        clickLoginButton,
        clickSignupButton,
        setUserAlreadyHasAnAccount
    }
}