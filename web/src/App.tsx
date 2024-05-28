import UserProvider from "./components/UserProvider.tsx";
import {DefaultAuthRepository} from "./repository/AuthRepository.ts";
import Authorized from "./components/Authorized.tsx";
import Tasks from "./screen/Tasks.tsx";
import Unauthorized from "./components/Unauthorized.tsx";
import LoginScreen from "./screen/LoginScreen.tsx";

const authRepository = new DefaultAuthRepository()

export default function App() {
    return (
        <UserProvider authRepository={authRepository}>
            <Authorized>
                <Tasks authRepository={authRepository}></Tasks>
            </Authorized>
            <Unauthorized>
                <LoginScreen authRepository={authRepository}></LoginScreen>
            </Unauthorized>
        </UserProvider>
    )
}